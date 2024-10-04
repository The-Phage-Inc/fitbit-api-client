import * as crypto from 'crypto';

/**
 * ランダムな文字列を生成する関数
 */
function generateRandomString(length: number): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * コードベリファイアの生成
 */
export function generateCodeVerifier(): string {
  return generateRandomString(32);
}

/**
 * コードチャレンジの生成
 *
 * @param codeVerifier
 */
export function generateCodeChallenge(codeVerifier: string): string {
  return crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Stateの生成
 */
export function generateState(): string {
  return generateRandomString(16);
}
