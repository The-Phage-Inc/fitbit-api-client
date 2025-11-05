import { exists, get } from '../utils/types.utils';
import { convertToOffsetDate } from '../utils/date.utils';

/**
 * 心拍変動の詳細データのレスポンス
 */
export interface HRVIntradayResponse {
  /**
   * 心拍変動の詳細データ
   * 取得にはIntradayの申請もしくはApplicationTypeがPersonalである必要があります。
   */
  hRVIntraday: HRVIntraday[];
}

export function HRVIntradayResponseFromJson(
  offsetFromUTCMillis: number,
  json: unknown,
): HRVIntradayResponse {
  const hrvData = exists(json, 'hrv') ? get<unknown[]>(json, 'hrv') : [];

  const hRVIntraday = hrvData.map((data) =>
    HRVIntradayFromJson(data, offsetFromUTCMillis),
  );

  return {
    hRVIntraday: hRVIntraday,
  };
}

/**
 * 心拍変動の詳細
 * 取得にはIntradayの申請もしくはApplicationTypeがPersonalである必要があります。
 */
export interface HRVIntraday {
  /**
   * ローカル日付
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
  value: HRVIntradayValue;
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

function HRVIntradayFromJson(
  json: unknown,
  offsetFromUTCMillis: number,
): HRVIntraday {
  return {
    localDate: get<string>(json, 'dateTime'),
    minutes: get<unknown[]>(json, 'minutes').map((data) =>
      HRVIntradayMinuteDataFromJson(data, offsetFromUTCMillis),
    ),
  };
}

function HRVIntradayMinuteDataFromJson(
  json: unknown,
  offsetFromUTCMillis: number,
): HRVIntradayMinute {
  return {
    minute: convertToOffsetDate(
      new Date(`${get<string>(json, 'minute')}Z`),
      offsetFromUTCMillis,
    ),
    value: HRVIntradayValueDataFromJson(get<unknown>(json, 'value')),
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
