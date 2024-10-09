import {
  AuthToken,
  HeartRateResponse,
  OAuthSession,
  PartialAuthToken,
  StepsResponse,
} from './models';
import { activityApi, heartRateApi, oauthApi, sleepApi } from './apis';
import { CODE_CHALLENGE_METHOD, FITBIT_AUTH_URL } from './constants';
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
} from './utils/oauth.utils';
import { UtcDate, DetailLevel, FitbitScope, MinuteDetailLevel } from './types';
import { CaloriesResponse } from './models/activities/calories';

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
      isAccessTokenExpired: this.isAccessTokenExpired.bind(this),
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
      getCaloriesIntraday: this.getCaloriesIntraday.bind(this),
    };
    this.sleep = {
      getSleepLog: this.getSleepLog.bind(this),
    };
  }

  /**
   * 認証関連のメソッドを提供するオブジェクト
   */
  public auth: {
    setToken: (token: PartialAuthToken) => void;
    getAccessToken: () => Promise<string>;
    refreshAccessToken: () => Promise<AuthToken>;
    isAccessTokenExpired: () => boolean;
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
      utcDate: UtcDate,
      detailLevel: DetailLevel,
    ) => Promise<HeartRateResponse>;
  };

  public activity: {
    getStepsIntraday: (
      utcDate: UtcDate,
      detailLevel: MinuteDetailLevel,
    ) => Promise<StepsResponse>;
    getCaloriesIntraday: (
      utcDate: UtcDate,
      detailLevel: MinuteDetailLevel,
    ) => Promise<CaloriesResponse>;
  };

  public sleep: {
    // FIXME
    getSleepLog: (utcDate: UtcDate) => Promise<unknown>;
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

  private validateToken(): { expiresAt: Date; accessToken: string } {
    if (!this.token) {
      throw new Error('token is required.');
    }
    if (!this.token.accessToken || !this.token.expiresAt) {
      throw new Error(
        'accessToken and expiresAt is required. Please call a refreshAccessToken().',
      );
    }
    return {
      expiresAt: this.token.expiresAt,
      accessToken: this.token.accessToken,
    };
  }

  /**
   * アクセストークンが期限切れまたはnullの場合にtrueを返す
   */
  private isAccessTokenExpired(): boolean {
    const token = this.validateToken();
    return token.expiresAt < new Date();
  }

  /**
   * アクセストークンを取得する
   * @throws {Error} アクセストークンが有効切れ
   */
  private async getAccessToken(): Promise<string> {
    const token = this.validateToken();
    if (this.isAccessTokenExpired()) {
      throw new Error('Access token is expired.');
    }
    return token.accessToken;
  }

  /**
   * リフレッシュトークンを使用してアクセストークンを再取得する
   * ※リフレッシュトークンは一度使用したら無効になる為、返却されたトークンを保存するようにお願いします。
   * @throws {Error} リフレッシュトークンが設定されていない場合
   */
  private async refreshAccessToken(): Promise<AuthToken> {
    if (!this.token) {
      throw new Error('refreshToken is required.');
    }

    const newToken = await oauthApi.postTokenRefresh({
      refreshToken: this.token.refreshToken,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    });

    this.setToken(newToken);
    return newToken;
  }

  private async getHeartRateIntraday(
    utcDate: UtcDate,
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
    utcDate: UtcDate,
    detailLevel: MinuteDetailLevel,
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

  private async getCaloriesIntraday(
    utcDate: UtcDate,
    detailLevel: MinuteDetailLevel,
  ): Promise<CaloriesResponse> {
    const accessToken = await this.auth.getAccessToken();
    return await activityApi.getCaloriesIntradayByDate(
      {
        utcDate: utcDate,
        detailLevel: detailLevel,
      },
      { accessToken },
    );
  }

  private async getSleepLog(utcDate: UtcDate): Promise<unknown> {
    const accessToken = await this.auth.getAccessToken();
    return await sleepApi.getSleepLogByDate(
      {
        utcDate: utcDate,
      },
      { accessToken },
    );
  }
}
