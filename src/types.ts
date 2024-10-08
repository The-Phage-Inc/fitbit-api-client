import { FITBIT_SCOPES } from './constants';

export type FitbitScope = (typeof FITBIT_SCOPES)[number];
/**
 * リクエスト用の日付
 * 'yyyy-MM-dd'
 */
export type UtcDate = `${YYYY}-${MM}-${DD}` | string;
type ZTN = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type YYYY = `20${ZTN}${ZTN}`;
type MM = `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `1${0 | 1 | 2}`;
type DD =
  | `${0}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `${1 | 2}${ZTN}`
  | `3${0 | 1}`;

export type DetailLevel = '1sec' | MinuteDetailLevel;
export type MinuteDetailLevel = '1min' | '5min' | '15min';

export type ZoneName = 'Out of Range' | 'Fat Burn' | 'Cardio' | 'Peak';
export type DatasetType = 'second' | 'minute';
