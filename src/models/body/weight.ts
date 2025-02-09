import { convertToOffsetDate } from '../../utils/date.utils';
import { get } from '../../utils/types.utils';

/**
 * 体重データのレスポンス
 */
export interface WeightResponse {
  /**
   * 体重のデータ一覧
   */
  weightLogs: WeightLog[];
}

export function WeightResponseFromJson(
  offsetFromUTCMillis: number,
  json: unknown,
): WeightResponse {
  return {
    weightLogs: get<unknown[]>(json, 'weight').map((data) =>
      WeightLogFromJson(offsetFromUTCMillis, data),
    ),
  };
}

export interface WeightLog {
  /**
   * 記録時間
   * @type {Date}
   */
  dateTime: Date;

  /**
   * 体重
   * @type {number}
   */
  weight: number;

  /**
   * ログID(ユーザー内で一意)
   */
  logId: bigint;

  /**
   * データソース
   */
  source: 'API' | 'Aria' | 'AriaAir' | 'Withings';

  /**
   * BMI
   */
  bmi: number;
}

function WeightLogFromJson(
  offsetFromUTCMillis: number,
  json: unknown,
): WeightLog {
  return {
    dateTime: convertToOffsetDate(
      new Date(`${get<string>(json, 'date')}T${get<string>(json, 'time')}Z`),
      offsetFromUTCMillis,
    ),
    weight: get<number>(json, 'weight'),
    logId: get<bigint>(json, 'logId'),
    source: get<'API' | 'Aria' | 'AriaAir' | 'Withings'>(json, 'source'),
    bmi: get<number>(json, 'bmi'),
  };
}
