import { FITBIT_SCOPES } from '../constants';
import { FitbitScope } from '../types';

/**
 * 値をFitbitScopeに変換する
 * @param value
 */
export function parseFitbitScope(value: unknown): FitbitScope {
  if (
    typeof value === 'string' &&
    FITBIT_SCOPES.find((scope) => scope === value)
  ) {
    return value as FitbitScope;
  }
  throw new Error('Invalid FitbitScope');
}

/**
 * 指定されたキーが存在するかどうかを確認する
 * @param json
 * @param key
 * @returns boolean
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function exists(json: any, key: string) {
  const value = json[key];
  return value !== null && value !== undefined;
}

/**
 * 指定されたキーが存在する場合はジェネリクスで型安全に値を取得し、存在しない場合は例外をスロー
 * @param obj
 * @param key
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get<T>(obj: any, key: string): T {
  if (!exists(obj, key)) {
    throw new Error(`Key not found: ${key} in ${JSON.stringify(obj)}`);
  }
  return obj[key] as T;
}

/**
 * 指定されたキーが存在する場合はその値を取得し、存在しない場合はundefinedを返す
 * @param json
 * @param key
 * @returns string | undefined
 */
export function getOptionalString(
  json: unknown,
  key: string,
): string | undefined {
  return exists(json, key) ? get<string>(json, key) : undefined;
}
