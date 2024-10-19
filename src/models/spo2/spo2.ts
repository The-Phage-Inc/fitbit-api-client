import { UtcDate } from '../../types';
import { get } from '../../utils/types.utils';

/**
 * 心拍数データのレスポンス
 */
export interface SpO2IntradayResponse {
  utcDate: UtcDate;
  dataset: SpO2IntradayData[];
}

export function SpO2IntradayResponseFromJson(
  json: unknown,
): SpO2IntradayResponse {
  const utcDate = get<UtcDate>(json, 'dateTime');
  const dataset = get<unknown[]>(json, 'minutes').map((data) =>
    SpO2IntradayDataFromJson(data),
  );
  return {
    utcDate,
    dataset,
  };
}

export interface SpO2IntradayData {
  /**
   * 時間
   * @type {Date}
   */
  dateTime: Date;
  /**
   * 心拍数
   * @type {number}
   */
  value: number;
}

function SpO2IntradayDataFromJson(json: unknown): SpO2IntradayData {
  return {
    dateTime: new Date(`${get<string>(json, 'minute')}Z`),
    value: get<number>(json, 'value'),
  };
}
