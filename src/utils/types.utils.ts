import { FITBIT_SCOPES } from '../constants';
import { FitbitScope } from '../types';

export function parseFitbitScope(value: unknown): FitbitScope {
  if (
    typeof value === 'string' &&
    FITBIT_SCOPES.find((scope) => scope === value)
  ) {
    return value as FitbitScope;
  }
  throw new Error('Invalid FitbitScope');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function exists(json: any, key: string) {
  const value = json[key];
  return value !== null && value !== undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get<T>(obj: any, key: string): T {
  if (!exists(obj, key)) {
    throw new Error(`Key not found: ${key}`);
  }
  return obj[key] as T;
}
