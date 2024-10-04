import { toFitbitUtcDateTime } from './date.utils';

describe('toFitbitUtcDateTime', () => {
  it('秒数とミリ秒が0だった場合は何もしないこと', () => {
    const ceil = toFitbitUtcDateTime(
      new Date('2024-04-01T12:00:00.000+09:00'),
      'ceil',
    );
    expect(ceil).toEqual({
      utcDate: '2024-04-01',
      utcTime: '03:00',
    });

    const floor = toFitbitUtcDateTime(
      new Date('2024-04-01T12:00:00.000+09:00'),
      'floor',
    );
    expect(floor).toEqual({
      utcDate: '2024-04-01',
      utcTime: '03:00',
    });
  });

  it('秒数に関係なく同じ分に切り捨てられること', () => {
    const max = toFitbitUtcDateTime(
      new Date('2024-04-01T12:00:59.999+09:00'),
      'floor',
    );
    expect(max).toEqual({
      utcDate: '2024-04-01',
      utcTime: '03:00',
    });

    const min = toFitbitUtcDateTime(
      new Date('2024-04-01T12:00:00.001+09:00'),
      'floor',
    );
    expect(min).toEqual({
      utcDate: '2024-04-01',
      utcTime: '03:00',
    });
  });

  it('秒数に関係なく次の分に繰り上げられること', () => {
    const max = toFitbitUtcDateTime(
      new Date('2024-04-01T12:00:59.999+09:00'),
      'ceil',
    );
    expect(max).toEqual({
      utcDate: '2024-04-01',
      utcTime: '03:01',
    });

    const min = toFitbitUtcDateTime(
      new Date('2024-04-01T12:00:00.001+09:00'),
      'ceil',
    );
    expect(min).toEqual({
      utcDate: '2024-04-01',
      utcTime: '03:01',
    });
  });

  it('日付が繰り上げられること', () => {
    const utcDate = toFitbitUtcDateTime(
      new Date('2024-04-01T23:59:59.999Z'),
      'ceil',
    );
    expect(utcDate).toEqual({
      utcDate: '2024-04-02',
      utcTime: '00:00',
    });
  });

  it('日付が繰り上がらないこと', () => {
    const jstDate = toFitbitUtcDateTime(
      new Date('2024-04-01T23:59:59.999+09:00'),
      'ceil',
    );
    expect(jstDate).toEqual({
      utcDate: '2024-04-01',
      utcTime: '15:00',
    });
  });

  it('UTCに変換されること', () => {
    const jstDate = toFitbitUtcDateTime(
      new Date('2024-04-01T00:00:00.000+09:00'),
      'floor',
    );
    expect(jstDate).toEqual({
      utcDate: '2024-03-31',
      utcTime: '15:00',
    });
  });
});
