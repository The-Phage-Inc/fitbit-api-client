import { SpO2IntradayResponse, SpO2IntradayResponseFromJson } from './spo2';

describe('SpO2', () => {
  it('問題なく型変換出来ること', () => {
    // Asia/Tokyoの場合
    const offsetFromUTCMillis = 32400000;
    const json = {
      dateTime: '2024-01-01',
      minutes: [
        {
          value: 95.7,
          minute: '2024-01-01T04:02:17',
        },
        {
          value: 99.5,
          minute: '2024-01-01T04:03:17',
        },
        {
          value: 99.0,
          minute: '2024-01-01T04:04:17',
        },
      ],
    };
    const spO2 = SpO2IntradayResponseFromJson(
      offsetFromUTCMillis,
      json,
    ) as SpO2IntradayResponse;
    expect(spO2).not.toBeNull();
    expect(spO2.localDate).toEqual('2024-01-01');
    expect(spO2.dataset.length).toEqual(3);
    expect(spO2.dataset[0].value).toEqual(95.7);
    expect(spO2.dataset[0].dateTime).toEqual(
      new Date('2024-01-01T04:02:17+09:00'),
    );
    expect(spO2.dataset[1].value).toEqual(99.5);
    expect(spO2.dataset[1].dateTime).toEqual(
      new Date('2024-01-01T04:03:17+09:00'),
    );
    expect(spO2.dataset[2].value).toEqual(99.0);
    expect(spO2.dataset[2].dateTime).toEqual(
      new Date('2024-01-01T04:04:17+09:00'),
    );
  });

  it('空のオブジェクトでも問題なく変換できること', () => {
    // Asia/Tokyoの場合
    const offsetFromUTCMillis = 32400000;
    const json = {};
    const spO2 = SpO2IntradayResponseFromJson(offsetFromUTCMillis, json);
    expect(spO2).toBeNull();
  });
});
