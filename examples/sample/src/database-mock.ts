import { Session } from 'fitbit-api-client';

/**
 * セッションをDBに保存して復元を再現
 */
export class DatabaseMock {
  session: Session | undefined;

  saveSession(session: Session) {
    this.session = session;
  }

  findSessionByState(_: string) {
    return this.session;
  }
}
