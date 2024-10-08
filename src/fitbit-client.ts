import {
  AuthToken,
  HeartRateResponse,
  OAuthSession,
  PartialAuthToken,
  StepsResponse,
} from './models';
import { activityApi, heartRateApi, oauthApi } from './apis';
import { CODE_CHALLENGE_METHOD, FITBIT_AUTH_URL } from './constants';
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
} from './utils/oauth.utils';
import { DATE, DetailLevel, FitbitScope } from './types';

type Props = {
  clientId: string;
  clientSecret: string;
  token?: PartialAuthToken;
  session?: OAuthSession;
};

export class FitbitClient {
  private readonly clientSecret: string;
  private readonly clientId: string;
  private token?: PartialAuthToken;
  private session?: OAuthSession;

  constructor({ clientId, clientSecret, token, session }: Props) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.token = token;
    this.session = session;

    // 関数にbindを行い、thisを固定する
    this.auth = {
      setToken: this.setToken.bind(this),
      getAccessToken: this.getAccessToken.bind(this),
      refreshAccessToken: this.refreshAccessToken.bind(this),
    };
    this.oauth = {
      createSession: this.createSession.bind(this),
      getAuthorizationUrl: this.getAuthorizationUrl.bind(this),
      setSession: this.setSession.bind(this),
      handleOAuthCallback: this.handleOAuthCallback.bind(this),
    };
    this.heartRate = {
      getHeartRateIntraday: this.getHeartRateIntraday.bind(this),
    };
    this.activity = {
      getStepsIntraday: this.getStepsIntraday.bind(this),
    };
  }

  /**
   * 認証関連のメソッドを提供するオブジェクト
   */
  public auth: {
    setToken: (token: PartialAuthToken) => void;
    getAccessToken: () => Promise<string>;
    refreshAccessToken: () => Promise<string>;
  };

  public oauth: {
    createSession: (
      redirectUrl: string | null,
      usePkce: boolean,
    ) => OAuthSession;
    getAuthorizationUrl: (scopes: readonly FitbitScope[]) => string;
    setSession: (session: OAuthSession) => void;
    handleOAuthCallback: (code: string, state: string) => Promise<AuthToken>;
  };

  public heartRate: {
    getHeartRateIntraday: (
      utcDate: DATE,
      detailLevel: DetailLevel,
    ) => Promise<HeartRateResponse>;
  };

  public activity: {
    getStepsIntraday: (
      utcDate: DATE,
      detailLevel: '1min' | '5min' | '15min',
    ) => Promise<StepsResponse>;
  };

  /**
   * セッションを作成する
   */
  private createSession(
    redirectUrl: string | null,
    usePkce: boolean = true,
  ): OAuthSession {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    this.session = {
      state,
      codeVerifier,
      codeChallenge: usePkce ? generateCodeChallenge(codeVerifier) : undefined,
      challengeMethod: usePkce ? CODE_CHALLENGE_METHOD : undefined,
      redirectUrl: redirectUrl ?? undefined,
    };
    return this.session;
  }

  /**
   * セッションを設定する
   */
  private setSession(session: OAuthSession) {
    this.session = session;
  }

  /**
   * 認証URLを取得する
   */
  private getAuthorizationUrl(scopes: readonly FitbitScope[]): string {
    if (!this.session) {
      throw new Error(
        'createSession or setSession must be called before getAuthorizationUrl',
      );
    }
    const { state, codeChallenge, challengeMethod, redirectUrl } = this.session;
    const scope = scopes.join('+');
    return `${FITBIT_AUTH_URL}?response_type=code&client_id=${this.clientId}&scope=${scope}&code_challenge=${codeChallenge}&code_challenge_method=${challengeMethod}&state=${state}&redirect_uri=${redirectUrl}`;
  }

  /**
   * OAuth2.0のコールバックを処理する
   * @throws {Error} sessionが設定されていない場合
   */
  private async handleOAuthCallback(
    code: string,
    state: string,
  ): Promise<AuthToken> {
    if (!this.session) {
      throw new Error('session is required.');
    }

    if (this.session.state !== state) {
      throw new Error('state is invalid.');
    }

    const token = await oauthApi.postAuthorization({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      redirectUrl: this.session.redirectUrl,
      codeVerifier: this.session.codeVerifier,
      code,
    });
    this.setToken(token);
    return token;
  }

  /**
   * トークンを設定するメソッド
   */
  private setToken(token: PartialAuthToken) {
    this.token = token;
  }

  /**
   * アクセストークンを取得する
   * 有効期限が切れている場合はリフレッシュトークンを使用して再取得する
   * @throws {Error} リフレッシュトークンが設定されていない場合
   */
  private async getAccessToken(): Promise<string> {
    if (!this.token) {
      throw new Error('refreshToken is required.');
    }

    // 期限が切れているまたはトークンがnullだった場合
    const now = new Date();
    if (
      !this.token.expiresAt ||
      !this.token.accessToken ||
      this.token.expiresAt < now
    ) {
      return this.refreshAccessToken();
    }

    return this.token.accessToken;
  }

  /**
   * リフレッシュトークンを使用してアクセストークンを再取得する
   * @throws {Error} リフレッシュトークンが設定されていない場合
   */
  private async refreshAccessToken(): Promise<string> {
    if (!this.token) {
      throw new Error('refreshToken is required.');
    }

    const newToken = await oauthApi.postTokenRefresh({
      refreshToken: this.token.refreshToken,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    });

    this.setToken(newToken);
    return newToken.accessToken;
  }

  private async getHeartRateIntraday(
    utcDate: DATE,
    detailLevel: DetailLevel,
  ): Promise<HeartRateResponse> {
    const accessToken = await this.auth.getAccessToken();
    return await heartRateApi.getHeartRateIntradayByDate(
      {
        utcDate: utcDate,
        detailLevel: detailLevel,
      },
      { accessToken },
    );
  }

  private async getStepsIntraday(
    utcDate: DATE,
    detailLevel: '1min' | '5min' | '15min',
  ): Promise<StepsResponse> {
    const accessToken = await this.auth.getAccessToken();
    return await activityApi.getStepsIntradayByDate(
      {
        utcDate: utcDate,
        detailLevel: detailLevel,
      },
      { accessToken },
    );
  }
}
