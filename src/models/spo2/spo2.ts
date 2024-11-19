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
): SpO2IntradayResponse | null {
  if (!exists(json, 'dateTime') || !exists(json, 'minutes')) {
    return null;
  }

  const localDate = get<string>(json, 'dateTime');
  const dataset = get<unknown[]>(json, 'minutes').map((data) =>
    SpO2IntradayDataFromJson(offsetFromUTCMillis, data),
  );
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
