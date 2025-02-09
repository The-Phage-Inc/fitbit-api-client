import { WeightResponseFromJson } from './weight';

describe('Weight', () => {
  it('問題なく型変換が出来ること', () => {
    // Asia/Tokyoの場合
    const offsetFromUTCMillis = 32400000;
    const json = {
      weight: [
        {
          bmi: 25.91,
          date: '2019-03-01',
          logId: 1553067494000,
          source: 'Aria',
          time: '07:38:14',
          weight: 200,
        },
      ],
    };

    const response = WeightResponseFromJson(offsetFromUTCMillis, json);
    expect(response.weightLogs).toHaveLength(1);
    expect(response.weightLogs[0].dateTime).toEqual(
      new Date('2019-03-01T07:38:14.000+09:00'),
    );
    expect(response.weightLogs[0].weight).toBe(200);
    expect(response.weightLogs[0].logId).toBe(1553067494000);
    expect(response.weightLogs[0].source).toBe('Aria');
    expect(response.weightLogs[0].bmi).toBe(25.91);
  });
});
