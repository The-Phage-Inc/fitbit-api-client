import { OAuthSession } from 'fitbit-api-client';

/**
 * セッションをDBに保存して復元を再現
 */
export class DatabaseMock {
  session: OAuthSession | undefined;
  refreshToken: string | undefined;

  saveSession(session: OAuthSession) {
    this.session = session;
  }

  findSessionByState(_: string) {
    return this.session;
  }

  saveRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

  findRefreshToken() {
    return this.refreshToken;
  }
}
