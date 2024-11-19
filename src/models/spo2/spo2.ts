import { exists, get } from '../../utils/types.utils';
import { convertToOffsetDate } from '../../utils/date.utils';

/**
 * 酸素飽和度のレスポンス
 */
export interface SpO2IntradayResponse {
  localDate?: string;
  dataset?: SpO2IntradayData[];
}

export function SpO2IntradayResponseFromJson(
  offsetFromUTCMillis: number,
  json: unknown,
): SpO2IntradayResponse {
  const localDate = exists(json, 'dateTime')
    ? get<string>(json, 'dateTime')
    : undefined;
  const dataset = exists(json, 'minutes')
    ? get<unknown[]>(json, 'minutes').map((data) =>
        SpO2IntradayDataFromJson(offsetFromUTCMillis, data),
      )
    : undefined;
  return {
    localDate,
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

function SpO2IntradayDataFromJson(
  offsetFromUTCMillis: number,
  json: unknown,
): SpO2IntradayData {
  return {
    dateTime: convertToOffsetDate(
      new Date(`${get<string>(json, 'minute')}Z`),
      offsetFromUTCMillis,
    ),
    value: get<number>(json, 'value'),
  };
}
