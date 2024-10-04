import { FitbitScope } from '../../types';
import { parseFitbitScope } from '../../utils/types.utils';

export interface Session {
  state: string;
  codeVerifier: string;
  codeChallenge: string;
  challengeMethod: string;
  redirectUrl: string;
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

// 型チェック関数
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidAuthTokenJson(json: any): json is {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  user_id: string;
} {
  return (
    typeof json === 'object' &&
    json !== null &&
    typeof json['access_token'] === 'string' &&
    typeof json['expires_in'] === 'number' &&
    typeof json['refresh_token'] === 'string' &&
    typeof json['scope'] === 'string' &&
    typeof json['token_type'] === 'string' &&
    typeof json['user_id'] === 'string'
  );
}

// AuthTokenをJSONからパース
export function AuthTokenFromJson(json: unknown): AuthToken {
  if (!isValidAuthTokenJson(json)) {
    throw new Error('Invalid AuthToken JSON');
  }

  const expiresAt = new Date(new Date().getTime() + json.expires_in * 1000);
  const scopes = json.scope.split(' ');
  const scope: FitbitScope[] = scopes.map(parseFitbitScope);

  return {
    accessToken: json.access_token,
    expiresAt,
    refreshToken: json.refresh_token,
    scope,
    tokenType: json.token_type,
    userId: json.user_id,
  };
}
