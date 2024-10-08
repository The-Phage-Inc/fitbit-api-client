import { OAuthSession } from 'fitbit-api-client';

/**
 * セッションをDBに保存して復元を再現
 */
export class DatabaseMock {
  session: OAuthSession | undefined;

  saveSession(session: OAuthSession) {
    this.session = session;
  }

  findSessionByState(_: string) {
    return this.session;
  }
}
