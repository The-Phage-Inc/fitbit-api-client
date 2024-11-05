/**
 * UTCとして解釈した日時を、UTCからのオフセットを適用して日時を変換する
 * @param tempDate 一旦UTCとして解釈した日時
 * @param offsetFromUTCMillis UTCからのオフセット
 */
export function convertToOffsetDate(
  tempDate: Date,
  offsetFromUTCMillis: number,
): Date {
  // オフセットを適用して、新しい日時を作成
  return new Date(tempDate.getTime() - offsetFromUTCMillis);
}

/**
 * 日付文字列が正しい形式かどうかをチェックする
 * @param dateString 日付文字列
 */
export function validateDateString(dateString: string) {
  if (!isDateString(dateString)) {
    throw new Error('yyyy-mm-dd形式で入力してください');
  }
}

function isDateString(dateString: string): boolean {
  // yyyy-mm-dd形式にマッチするかどうかをチェック
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}
