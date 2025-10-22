import { HRVIntradayResponseFromJson } from './hrv-intraday';

describe('HRVIntraday', () => {
  it('問題なく型変換出来ること', () => {
    const json = {
      hrv: [
        {
          dateTime: '2024-10-07',
          minutes: [
            {
              minute: new Date('2024-10-07T05:07:30.000+09:00'),
              value: [
                {
                  rmssd: 45.5,
                  coverage: 0.95,
                  hf: 0.25,
                  lf: 0.15,
                },
              ],
            },
            {
              minute: new Date('2024-10-07T05:12:30.000+09:00'),
              value: [
                {
                  rmssd: 48.2,
                  coverage: 0.92,
                  hf: 0.28,
                  lf: 0.18,
                },
              ],
            },
          ],
        },
      ],
      'hrv-intraday': {
        hrv: [
          {
            dateTime: '2024-10-07',
            minutes: [
              {
                minute: new Date('2024-10-07T05:07:30.000+09:00'),
                value: [
                  {
                    rmssd: 45.5,
                    coverage: 0.95,
                    hf: 0.25,
                    lf: 0.15,
                  },
                ],
              },
              {
                minute: new Date('2024-10-07T05:12:30.000+09:00'),
                value: [
                  {
                    rmssd: 48.2,
                    coverage: 0.92,
                    hf: 0.28,
                    lf: 0.18,
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    const hrvIntradayResponse = HRVIntradayResponseFromJson(json);
    expect(hrvIntradayResponse.hRVIntraday).toBeDefined();
    expect(hrvIntradayResponse.hRVIntraday?.hRvIntraday.length).toEqual(1);
    expect(hrvIntradayResponse.hRVIntraday?.hRvIntraday[0].localDate).toEqual(
      '2024-10-07',
    );
    expect(
      hrvIntradayResponse.hRVIntraday?.hRvIntraday[0].minutes.length,
    ).toEqual(2);
    expect(
      hrvIntradayResponse.hRVIntraday?.hRvIntraday[0].minutes[0].minute,
    ).toEqual(new Date('2024-10-07T05:07:30.000+09:00'));
    expect(
      hrvIntradayResponse.hRVIntraday?.hRvIntraday[0].minutes[0].value.length,
    ).toEqual(1);
    expect(
      hrvIntradayResponse.hRVIntraday?.hRvIntraday[0].minutes[0].value[0].rmssd,
    ).toEqual(45.5);
    expect(
      hrvIntradayResponse.hRVIntraday?.hRvIntraday[0].minutes[0].value[0]
        .coverage,
    ).toEqual(0.95);
    expect(
      hrvIntradayResponse.hRVIntraday?.hRvIntraday[0].minutes[0].value[0].hf,
    ).toEqual(0.25);
    expect(
      hrvIntradayResponse.hRVIntraday?.hRvIntraday[0].minutes[0].value[0].lf,
    ).toEqual(0.15);
    expect(
      hrvIntradayResponse.hRVIntraday?.hRvIntraday[0].minutes[1].minute,
    ).toEqual(new Date('2024-10-07T05:12:30.000+09:00'));
    expect(
      hrvIntradayResponse.hRVIntraday?.hRvIntraday[0].minutes[1].value[0].rmssd,
    ).toEqual(48.2);
  });

  it('hrvフィールドがない場合でも問題なく型変換出来ること', () => {
    const json = {};

    const hrvIntradayResponse = HRVIntradayResponseFromJson(json);
    expect(hrvIntradayResponse.hRVIntraday).toBeUndefined();
  });

  it('複数のvalueがある場合でも問題なく型変換出来ること', () => {
    const json = {
      hrv: [
        {
          dateTime: '2024-10-07',
          minutes: [
            {
              minute: new Date('2024-10-07T05:07:30.000+09:00'),
              value: [
                {
                  rmssd: 45.5,
                  coverage: 0.95,
                  hf: 0.25,
                  lf: 0.15,
                },
                {
                  rmssd: 46.8,
                  coverage: 0.93,
                  hf: 0.26,
                  lf: 0.16,
                },
              ],
            },
          ],
        },
      ],
      'hrv-intraday': {
        hrv: [
          {
            dateTime: '2024-10-07',
            minutes: [
              {
                minute: new Date('2024-10-07T05:07:30.000+09:00'),
                value: [
                  {
                    rmssd: 45.5,
                    coverage: 0.95,
                    hf: 0.25,
                    lf: 0.15,
                  },
                  {
                    rmssd: 46.8,
                    coverage: 0.93,
                    hf: 0.26,
                    lf: 0.16,
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    const hrvIntradayResponse = HRVIntradayResponseFromJson(json);
    expect(hrvIntradayResponse.hRVIntraday).toBeDefined();
    expect(
      hrvIntradayResponse.hRVIntraday?.hRvIntraday[0].minutes[0].value.length,
    ).toEqual(2);
    expect(
      hrvIntradayResponse.hRVIntraday?.hRvIntraday[0].minutes[0].value[0].rmssd,
    ).toEqual(45.5);
    expect(
      hrvIntradayResponse.hRVIntraday?.hRvIntraday[0].minutes[0].value[1].rmssd,
    ).toEqual(46.8);
  });
});
