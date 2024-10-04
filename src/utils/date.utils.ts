import { DATE, FitbitDateTime, RoundOption } from '../types';

/**
 * 日付をリクエスト用の形式に変換する
 * floor: 切り捨て(startDateで使用を想定)
 * ceil: 繰り上げ(endDateで使用を想定)
 * @param date
 * @param rounding
 */
export function toFitbitUtcDateTime(
  date: Date,
  rounding: RoundOption,
): FitbitDateTime {
  const clonedDate = new Date(date); // クローンを作成

  const seconds = clonedDate.getUTCSeconds();
  const milliseconds = clonedDate.getUTCMilliseconds();

  // 秒またはミリ秒が0でない場合に繰り上げ
  if (rounding === 'ceil' && (seconds > 0 || milliseconds > 0)) {
    clonedDate.setUTCMinutes(clonedDate.getUTCMinutes() + 1);
  }

  // 秒とミリ秒をリセット
  clonedDate.setUTCSeconds(0, 0);

  return {
    utcDate: clonedDate.toISOString().split('T')[0] as DATE,
    utcTime: clonedDate.toISOString().split('T')[1].slice(0, 5),
  };
}
