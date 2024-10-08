import { BaseApi } from './base.api';
import { AuthToken, AuthTokenFromJson } from '../models';

interface AuthorizationRequest {
  clientId: string;
  clientSecret: string;
  redirectUrl?: string;
  codeVerifier: string;
  code: string;
}

interface RefreshTokenRequest {
  refreshToken: string;
  clientId: string;
  clientSecret?: string;
  expiresIn?: number;
}

export class OAuthApi extends BaseApi {
  override scope = null;

  async postTokenRefresh(
    request: RefreshTokenRequest,
    options?: RequestInit,
  ): Promise<AuthToken> {
    const { refreshToken, clientId, clientSecret, expiresIn } = request;

    const body = new URLSearchParams({
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
      ...(expiresIn ? { expires_in: expiresIn.toString() } : {}),
      ...(clientSecret ? {} : { client_id: clientId }),
    });

    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (clientSecret) {
      headers['Authorization'] =
        `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
    }

    const res = await this.post('/oauth2/token', body, {
      ...options,
      headers,
    });
    return AuthTokenFromJson(res);
  }

  async postAuthorization({
    clientId,
    clientSecret,
    redirectUrl,
    codeVerifier,
    code,
  }: AuthorizationRequest): Promise<AuthToken> {
    const body = new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      code_verifier: codeVerifier,
    });
    if (redirectUrl) {
      body.append('redirect_uri', redirectUrl);
    }

    const headers = {
      Authorization:
        'Basic ' +
        Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const res = await this.post('/oauth2/token', body, { headers });
    return AuthTokenFromJson(res);
  }
}
