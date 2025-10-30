import { HRVIntradayResponseFromJson } from './hrv-intraday';

describe('HRVIntraday', () => {
  it('問題なく型変換出来ること', () => {
    const offsetFromUTCMillis = 9 * 60 * 60 * 1000; // JST (UTC+9)
    const json = {
      hrv: [
        {
          dateTime: '2024-10-07',
          minutes: [
            {
              minute: '2024-10-07T05:07:30.000',
              value: {
                rmssd: 45.5,
                coverage: 0.95,
                hf: 0.25,
                lf: 0.15,
              },
            },
            {
              minute: '2024-10-07T05:12:30.000',
              value: {
                rmssd: 48.2,
                coverage: 0.92,
                hf: 0.28,
                lf: 0.18,
              },
            },
          ],
        },
      ],
    };

    const hrvIntradayResponse = HRVIntradayResponseFromJson(
      offsetFromUTCMillis,
      json,
    );
    expect(hrvIntradayResponse.hRVIntraday).toBeDefined();
    expect(hrvIntradayResponse.hRVIntraday.length).toEqual(1);
    expect(hrvIntradayResponse.hRVIntraday[0].localDate).toEqual('2024-10-07');
    expect(hrvIntradayResponse.hRVIntraday[0].minutes.length).toEqual(2);
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[0].minute).toEqual(
      new Date('2024-10-07T14:07:30.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[0].value.rmssd).toEqual(
      45.5,
    );
    expect(
      hrvIntradayResponse.hRVIntraday[0].minutes[0].value.coverage,
    ).toEqual(0.95);
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[0].value.hf).toEqual(
      0.25,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[0].value.lf).toEqual(
      0.15,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[1].minute).toEqual(
      new Date('2024-10-07T14:12:30.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[1].value.rmssd).toEqual(
      48.2,
    );
    expect(
      hrvIntradayResponse.hRVIntraday[0].minutes[1].value.coverage,
    ).toEqual(0.92);
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[1].value.hf).toEqual(
      0.28,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[1].value.lf).toEqual(
      0.18,
    );
  });

  it('hrvフィールドがない場合でも問題なく型変換出来ること', () => {
    const offsetFromUTCMillis = 9 * 60 * 60 * 1000;
    const json = {};

    const hrvIntradayResponse = HRVIntradayResponseFromJson(
      offsetFromUTCMillis,
      json,
    );
    expect(hrvIntradayResponse.hRVIntraday.length).toEqual(0);
  });

  it('複数のminutesがある場合でも問題なく型変換出来ること', () => {
    const offsetFromUTCMillis = 9 * 60 * 60 * 1000;
    const json = {
      hrv: [
        {
          dateTime: '2024-10-07',
          minutes: [
            {
              minute: '2024-10-07T05:07:30.000',
              value: {
                rmssd: 45.5,
                coverage: 0.95,
                hf: 0.25,
                lf: 0.15,
              },
            },
            {
              minute: '2024-10-07T05:12:30.000',
              value: {
                rmssd: 46.8,
                coverage: 0.93,
                hf: 0.26,
                lf: 0.16,
              },
            },
            {
              minute: '2024-10-07T05:17:30.000',
              value: {
                rmssd: 47.2,
                coverage: 0.94,
                hf: 0.27,
                lf: 0.17,
              },
            },
          ],
        },
      ],
    };

    const hrvIntradayResponse = HRVIntradayResponseFromJson(
      offsetFromUTCMillis,
      json,
    );
    expect(hrvIntradayResponse.hRVIntraday).toBeDefined();
    expect(hrvIntradayResponse.hRVIntraday.length).toEqual(1);
    expect(hrvIntradayResponse.hRVIntraday[0].localDate).toEqual('2024-10-07');
    expect(hrvIntradayResponse.hRVIntraday[0].minutes.length).toEqual(3);
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[0].value.rmssd).toEqual(
      45.5,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[1].value.rmssd).toEqual(
      46.8,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[2].value.rmssd).toEqual(
      47.2,
    );
  });
});
