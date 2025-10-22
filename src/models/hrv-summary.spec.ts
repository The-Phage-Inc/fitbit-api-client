import { HRVSummaryResponseFromJson } from './hrv-summary';

describe('HRVSummary', () => {
  it('問題なく型変換出来ること', () => {
    const json = {
      hrv: [
        {
          dateTime: '2024-10-07',
          value: [
            {
              dailyRmssd: 45.5,
              deepRmssd: 52.3,
            },
          ],
        },
        {
          dateTime: '2024-10-08',
          value: [
            {
              dailyRmssd: 48.2,
              deepRmssd: 55.1,
            },
          ],
        },
      ],
    };

    const hrvSummaryResponse = HRVSummaryResponseFromJson(json);
    expect(hrvSummaryResponse.hRV.length).toEqual(2);
    expect(hrvSummaryResponse.hRV[0].localDate).toEqual('2024-10-07');
    expect(hrvSummaryResponse.hRV[0].value.length).toEqual(1);
    expect(hrvSummaryResponse.hRV[0].value[0].dailyRmssd).toEqual(45.5);
    expect(hrvSummaryResponse.hRV[0].value[0].deepRmssd).toEqual(52.3);
    expect(hrvSummaryResponse.hRV[1].localDate).toEqual('2024-10-08');
    expect(hrvSummaryResponse.hRV[1].value[0].dailyRmssd).toEqual(48.2);
    expect(hrvSummaryResponse.hRV[1].value[0].deepRmssd).toEqual(55.1);
  });

  it('複数のvalueがある場合でも問題なく型変換出来ること', () => {
    const json = {
      hrv: [
        {
          dateTime: '2024-10-07',
          value: [
            {
              dailyRmssd: 45.5,
              deepRmssd: 52.3,
            },
            {
              dailyRmssd: 46.8,
              deepRmssd: 53.7,
            },
          ],
        },
      ],
    };

    const hrvSummaryResponse = HRVSummaryResponseFromJson(json);
    expect(hrvSummaryResponse.hRV.length).toEqual(1);
    expect(hrvSummaryResponse.hRV[0].localDate).toEqual('2024-10-07');
    expect(hrvSummaryResponse.hRV[0].value.length).toEqual(2);
    expect(hrvSummaryResponse.hRV[0].value[0].dailyRmssd).toEqual(45.5);
    expect(hrvSummaryResponse.hRV[0].value[0].deepRmssd).toEqual(52.3);
    expect(hrvSummaryResponse.hRV[0].value[1].dailyRmssd).toEqual(46.8);
    expect(hrvSummaryResponse.hRV[0].value[1].deepRmssd).toEqual(53.7);
  });
});
