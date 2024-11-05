import { convertToOffsetDate, validateDateString } from './date.utils';

describe('DateUtils', () => {
  it('Date型に変換できること', () => {
    // UTCとして解釈した日時
    const utcDate = new Date('2024-10-07T09:58:30.000Z');
    // Asia/Tokyo のタイムゾーン
    const offsetFromUTCMillis = 32400000;
    const date = convertToOffsetDate(utcDate, offsetFromUTCMillis);
    expect(date).toEqual(new Date('2024-10-07T09:58:30.000+09:00'));
  });

  it('yyyy-mm-ddチェック(正常系)', () => {
    const dateString = '2024-10-07';
    // エラーが出ないことを確認
    expect(() => validateDateString(dateString)).not.toThrow();
  });

  it('yyyy-mm-ddチェック(異常系)', () => {
    const dateString = '2024/10/07';
    expect(() => validateDateString(dateString)).toThrow();

    const dateString2 = '2024-10-07T09:58:30.000Z';
    expect(() => validateDateString(dateString2)).toThrow();

    const dateString3 = 'today';
    expect(() => validateDateString(dateString3)).toThrow();
  });
});
