import { get } from '../utils/types.utils';

/**
 * 心拍変動のデータのレスポンス
 */
export interface HRVSummaryResponse {
  /**
   * 心拍変動のデータ一覧
   */
  hRV: HRVData[];
}

export function HRVSummaryResponseFromJson(json: unknown): HRVSummaryResponse {
  const hRV = get<unknown[]>(json, 'hrv').map((data) => HRVDataFromJson(data));

  return {
    hRV,
  };
}

export interface HRVData {
  /**
   * 睡眠ログのローカル日付
   * yyyy-MM-dd
   */
  localDate: string;
  /**
   * 心拍変動の値
   */
  value: HRVValue;
}

export interface HRVValue {
  /**
   * 心拍間で1日の短期的な変動(ミリ秒)
   */
  dailyRmssd: number;
  /**
   * 心拍間で1日の睡眠中における短期的な変動(ミリ秒)
   */
  deepRmssd: number;
}

function HRVDataFromJson(json: unknown): HRVData {
  return {
    localDate: get<string>(json, 'dateTime'),
    value: HRVValueFromJson(get<unknown>(json, 'value')),
  };
}

function HRVValueFromJson(json: unknown): HRVValue {
  return {
    dailyRmssd: get<number>(json, 'dailyRmssd'),
    deepRmssd: get<number>(json, 'deepRmssd'),
  };
}
