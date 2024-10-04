import {
  AuthToken,
  HeartRateResponse,
  PartialAuthToken,
  Session,
} from './models';
import { heartRateApi, oauthApi } from './apis';
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
  session?: Session;
};

export class FitbitClient {
  private readonly clientSecret: string;
  private readonly clientId: string;
  private token?: PartialAuthToken;
  private session?: Session;

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
      getHeartRateIntradayByDate: this.getHeartRateIntradayByDate.bind(this),
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
    createSession: (redirectUrl: string) => Session;
    getAuthorizationUrl: (scopes: FitbitScope[]) => string;
    setSession: (session: Session) => void;
    handleOAuthCallback: (code: string, state: string) => Promise<AuthToken>;
  };

  public heartRate: {
    getHeartRateIntradayByDate: (
      utcDate: DATE,
      detailLevel: DetailLevel,
    ) => Promise<HeartRateResponse>;
  };

  /**
   * セッションを作成する
   */
  private createSession(redirectUrl: string): Session {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    this.session = {
      state,
      codeVerifier,
      codeChallenge,
      challengeMethod: CODE_CHALLENGE_METHOD,
      redirectUrl,
    };
    return this.session;
  }

  /**
   * セッションを設定する
   */
  private setSession(session: Session) {
    this.session = session;
  }

  /**
   * 認証URLを取得する
   */
  private getAuthorizationUrl(scopes: FitbitScope[]): string {
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

  private async getHeartRateIntradayByDate(
    utcDate: DATE,
    detailLevel: DetailLevel,
  ): Promise<HeartRateResponse> {
    const accessToken = await this.auth.getAccessToken();
    return await heartRateApi.getHeartRateIntradayByDate(
      {
        userId: '-',
        utcDate: utcDate,
        detailLevel: detailLevel,
        timezone: 'UTC',
      },
      { accessToken },
    );
  }
}