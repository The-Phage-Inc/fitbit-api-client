import { exists, get } from '../utils/types.utils';

/**
 * 日中の心拍変動のデータのレスポンス
 */
export interface HRVResponse {
  /**
   * 心拍変動のデータ一覧
   */
  hRV: HRVData[];
  /**
   * 心拍変動の詳細データ
   * 取得にはIntradayの申請もしくはApplicationTypeがPersonalである必要があります。
   */
  hRVIntraday?: HRVIntraday;
}

export function HRVResponseFromJson(json: unknown): HRVResponse {
  const hRV = get<unknown[]>(json, 'hrv').map((data) => HRVDataFromJson(data));
  const hRVIntraday = exists(json, 'hrv')
    ? HRVIntradayFromJson(get<unknown[]>(json, 'hrv-intraday'))
    : undefined;

  return {
    hRV,
    hRVIntraday,
  };
}

export interface HRVData {
  /**
   * 睡眠ログのローカル日付
   * yyyy-MM-dd
   */
  localDate: string;
  /**
   *
   */
  value: HRVValue[];
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
    value: get<unknown[]>(json, 'value').map((data) => HRVValueFromJson(data)),
  };
}

function HRVValueFromJson(json: unknown): HRVValue {
  return {
    dailyRmssd: get<number>(json, 'dailyRmssd'),
    deepRmssd: get<number>(json, 'deepRmssd'),
  };
}

/**
 * 心拍変動の詳細
 * 取得にはIntradayの申請もしくはApplicationTypeがPersonalである必要があります。
 */
export interface HRVIntraday {
  /**
   * 心拍変動の詳細データ
   */
  hRvIntraday: HRVIntradayData[];
}

/**
 * 心拍変動の詳細データ
 */
export interface HRVIntradayData {
  /**
   * 睡眠ログが記録された時のローカル日時
   * 'yyyy-MM-dd'
   */
  localDate: string;
  /**
   * 特定の時間ごとのデータ
   */
  minutes: HRVIntradayMinute[];
}

/**
 * 心拍変動における特定の時間の詳細データ
 */
export interface HRVIntradayMinute {
  /**
   * 時間
   */
  minute: Date;
  /**
   * 心拍変動の詳細データ
   */
  value: HRVIntradayValue[];
}

/**
 * 心拍変動の詳細データ
 */
export interface HRVIntradayValue {
  /**
   * 心拍数の短期的な変動(ミリ秒)
   * @type {number}
   */
  rmssd: number;
  /**
   * 心拍間隔の数の観点から見たデータの完全性
   * @type {number}
   */
  coverage: number;
  /**
   *  高周波帯域内の心拍感覚変動の強さ(Hz)
   *  範囲(0.15 Hz - 0.4 Hz)
   *  @Type {number}
   */
  hf: number;
  /**
   * 低周波帯域内の心拍感覚変動の強さ(Hz)
   *  範囲(0.04 Hz - 0.15 Hz)
   *  @Type {number}
   */
  lf: number;
}

function HRVIntradayFromJson(json: unknown): HRVIntraday {
  return {
    hRvIntraday: get<unknown[]>(json, 'hrv').map((data) =>
      HRVIntradayDataFromJson(data),
    ),
  };
}

function HRVIntradayDataFromJson(json: unknown): HRVIntradayData {
  return {
    localDate: get<string>(json, 'dateTime'),
    minutes: get<unknown[]>(json, 'minutes').map((data) =>
      HRVIntradayMinuteDataFromJson(data),
    ),
  };
}

function HRVIntradayMinuteDataFromJson(json: unknown): HRVIntradayMinute {
  return {
    minute: get<Date>(json, 'minute'),
    value: get<unknown[]>(json, 'value').map((data) =>
      HRVIntradayValueDataFromJson(data),
    ),
  };
}

function HRVIntradayValueDataFromJson(json: unknown): HRVIntradayValue {
  return {
    rmssd: get<number>(json, 'rmssd'),
    coverage: get<number>(json, 'coverage'),
    hf: get<number>(json, 'hf'),
    lf: get<number>(json, 'lf'),
  };
}
