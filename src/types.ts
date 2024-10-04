import { FITBIT_SCOPES } from './constants';

export type FitbitScope = (typeof FITBIT_SCOPES)[number];
// FitbitAPIリクエスト用の日時
export type FitbitDateTime = {
  // 'yyyy-MM-dd'
  utcDate: DATE;
  // 'HH:mm'
  utcTime: string;
};
/**
 * ceil: 切り上げ(endDateで使用を想定)
 * floor: 切り捨て(startDateで使用を想定)
 */
export type RoundOption = 'ceil' | 'floor';
/**
 * リクエスト用の日付
 * 'yyyy-MM-dd'
 */
export type DATE = `${YYYY}-${MM}-${DD}`;
type ZERO_TO_NINE = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type YYYY = `20${ZERO_TO_NINE}${ZERO_TO_NINE}`;
type MM = `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `1${0 | 1 | 2}`;
type DD =
  | `${0}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `${1 | 2}${ZERO_TO_NINE}`
  | `3${0 | 1}`;

export type DetailLevel = '1sec' | '1min' | '5min' | '15min';
export type ZoneName = 'Out of Range' | 'Fat Burn' | 'Cardio' | 'Peak';
export type DatasetType = 'second' | 'minute';
