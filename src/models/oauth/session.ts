import { FitbitScope } from '../../types';
import { get, parseFitbitScope } from '../../utils/types.utils';

export interface OAuthSession {
  state: string;
  codeVerifier: string;
  codeChallenge?: string;
  challengeMethod?: string;
  redirectUrl?: string;
}

/**
 * リフレッシュトークンのみ必須
 */
export type PartialAuthToken = {
  refreshToken: AuthToken['refreshToken'];
} & Partial<Omit<AuthToken, 'refreshToken'>>;

export interface AuthToken {
  accessToken: string;
  expiresAt: Date;
  refreshToken: string;
  scope: FitbitScope[];
  tokenType: string;
  userId: string;
}

// AuthTokenをJSONからパース
export function AuthTokenFromJson(json: unknown): AuthToken {
  const expiresAt = new Date(
    new Date().getTime() + get<number>(json, 'expires_in') * 1000,
  );
  const scopes = get<string>(json, 'scope').split(' ');
  const scope: FitbitScope[] = scopes.map(parseFitbitScope);

  return {
    accessToken: get<string>(json, 'access_token'),
    expiresAt,
    refreshToken: get<string>(json, 'refresh_token'),
    scope,
    tokenType: get<string>(json, 'token_type'),
    userId: get<string>(json, 'user_id'),
  };
}
