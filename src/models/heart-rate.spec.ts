import { HeartRateResponseFromJson } from './heart-rate';

describe('HeartRate', () => {
  it('問題なく型変換出来ること', () => {
    const json = {
      'activities-heart': [
        {
          dateTime: '2024-01-01',
          value: {
            customHeartRateZones: [],
            heartRateZones: [
              {
                caloriesOut: 1796.4519,
                max: 122,
                min: 30,
                minutes: 1440,
                name: 'Out of Range',
              },
              {
                caloriesOut: 0,
                max: 146,
                min: 122,
                minutes: 0,
                name: 'Fat Burn',
              },
              {
                caloriesOut: 0,
                max: 176,
                min: 146,
                minutes: 0,
                name: 'Cardio',
              },
              {
                caloriesOut: 0,
                max: 220,
                min: 176,
                minutes: 0,
                name: 'Peak',
              },
            ],
            restingHeartRate: 75,
          },
        },
      ],
      'activities-heart-intraday': {
        dataset: [
          {
            time: '03:44:00',
            value: 77,
          },
          {
            time: '16:40:00',
            value: 85,
          },
        ],
        datasetInterval: 1,
        datasetType: 'minute',
      },
    };
    const heatRateResponse = HeartRateResponseFromJson('2024-01-01', json);
    expect(heatRateResponse.activitiesHeart[0].utcDate).toEqual('2024-01-01');
    expect(heatRateResponse.activitiesHeart[0].value.restingHeartRate).toEqual(
      75,
    );
    expect(
      heatRateResponse.activitiesHeart[0].value.heartRateZones.length,
    ).toEqual(4);
    expect(
      heatRateResponse.activitiesHeart[0].value.heartRateZones[0].name,
    ).toEqual('Out of Range');
    expect(
      heatRateResponse.activitiesHeart[0].value.heartRateZones[0].min,
    ).toEqual(30);
    expect(
      heatRateResponse.activitiesHeart[0].value.heartRateZones[0].max,
    ).toEqual(122);
    expect(
      heatRateResponse.activitiesHeart[0].value.heartRateZones[0].minutes,
    ).toEqual(1440);
    expect(
      heatRateResponse.activitiesHeart[0].value.heartRateZones[0].caloriesOut,
    ).toEqual(1796.4519);

    expect(heatRateResponse.activitiesHeartIntraday?.dataset.length).toEqual(2);
    expect(
      heatRateResponse.activitiesHeartIntraday?.dataset[0].dateTime,
    ).toEqual(new Date('2024-01-01T03:44:00.000Z'));
    expect(heatRateResponse.activitiesHeartIntraday?.dataset[0].value).toEqual(
      77,
    );
    expect(
      heatRateResponse.activitiesHeartIntraday?.dataset[1].dateTime,
    ).toEqual(new Date('2024-01-01T16:40:00.000Z'));
    expect(heatRateResponse.activitiesHeartIntraday?.dataset[1].value).toEqual(
      85,
    );
    expect(heatRateResponse.activitiesHeartIntraday?.datasetInterval).toEqual(
      1,
    );
    expect(heatRateResponse.activitiesHeartIntraday?.datasetType).toEqual(
      'minute',
    );
  });

  it('activities-heart-intradayやrestingHeartRateがない場合でも問題なく型変換出来ること', () => {
    const json = {
      'activities-heart': [
        {
          dateTime: '2024-01-01',
          value: {
            customHeartRateZones: [],
            heartRateZones: [
              {
                caloriesOut: 1796.4519,
                max: 122,
                min: 30,
                minutes: 1440,
                name: 'Out of Range',
              },
              {
                caloriesOut: 0,
                max: 146,
                min: 122,
                minutes: 0,
                name: 'Fat Burn',
              },
              {
                caloriesOut: 0,
                max: 176,
                min: 146,
                minutes: 0,
                name: 'Cardio',
              },
              {
                caloriesOut: 0,
                max: 220,
                min: 176,
                minutes: 0,
                name: 'Peak',
              },
            ],
          },
        },
      ],
    };
    const heatRateResponse = HeartRateResponseFromJson('2024-01-01', json);
    expect(heatRateResponse.activitiesHeart[0].utcDate).toEqual('2024-01-01');
    expect(
      heatRateResponse.activitiesHeart[0].value.restingHeartRate,
    ).toBeUndefined();
    expect(
      heatRateResponse.activitiesHeart[0].value.heartRateZones.length,
    ).toEqual(4);
    expect(
      heatRateResponse.activitiesHeart[0].value.heartRateZones[0].name,
    ).toEqual('Out of Range');
    expect(
      heatRateResponse.activitiesHeart[0].value.heartRateZones[0].min,
    ).toEqual(30);
    expect(
      heatRateResponse.activitiesHeart[0].value.heartRateZones[0].max,
    ).toEqual(122);
    expect(
      heatRateResponse.activitiesHeart[0].value.heartRateZones[0].minutes,
    ).toEqual(1440);
    expect(
      heatRateResponse.activitiesHeart[0].value.heartRateZones[0].caloriesOut,
    ).toEqual(1796.4519);
    expect(heatRateResponse.activitiesHeartIntraday).toBeUndefined();
  });
});
