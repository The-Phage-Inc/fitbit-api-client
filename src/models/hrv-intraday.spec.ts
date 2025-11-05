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
              minute: '2024-10-07T14:12:30.000',
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
      new Date('2024-10-07T05:07:30.000+09:00'),
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
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[0].minute).toEqual(
      new Date('2024-10-07T05:07:30.000+09:00'),
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
      new Date('2024-10-07T05:12:30.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[1].value.rmssd).toEqual(
      46.8,
    );
    expect(
      hrvIntradayResponse.hRVIntraday[0].minutes[1].value.coverage,
    ).toEqual(0.93);
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[1].value.hf).toEqual(
      0.26,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[1].value.lf).toEqual(
      0.16,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[2].minute).toEqual(
      new Date('2024-10-07T05:17:30.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[2].value.rmssd).toEqual(
      47.2,
    );
    expect(
      hrvIntradayResponse.hRVIntraday[0].minutes[2].value.coverage,
    ).toEqual(0.94);
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[2].value.hf).toEqual(
      0.27,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[2].value.lf).toEqual(
      0.17,
    );
  });

  it('fitbitデータとの比較', () => {
    const offsetFromUTCMillis = 9 * 60 * 60 * 1000; // JST (UTC+9)
    // 実データを再現したデータ
    const fitbitJson = {
      hrv: [
        {
          minutes: [
            {
              value: {
                rmssd: 71.841,
                coverage: 0.864,
                hf: 512.47,
                lf: 3213.718,
              },
              minute: '2025-10-14T02:25:00.000',
            },
            {
              value: {
                rmssd: 75.641,
                coverage: 0.921,
                hf: 963.91,
                lf: 2509.695,
              },
              minute: '2025-10-14T02:30:00.000',
            },
            {
              value: {
                rmssd: 79.315,
                coverage: 0.975,
                hf: 930.394,
                lf: 833.697,
              },
              minute: '2025-10-14T02:35:00.000',
            },
            {
              value: {
                rmssd: 83.103,
                coverage: 0.927,
                hf: 1208.774,
                lf: 1836.921,
              },
              minute: '2025-10-14T02:40:00.000',
            },
            {
              value: {
                rmssd: 77.341,
                coverage: 0.886,
                hf: 1210.176,
                lf: 744.785,
              },
              minute: '2025-10-14T03:00:00.000',
            },
            {
              value: {
                rmssd: 45.338,
                coverage: 0.884,
                hf: 351.841,
                lf: 524.131,
              },
              minute: '2025-10-14T03:05:00.000',
            },
            {
              value: {
                rmssd: 63.953,
                coverage: 0.814,
                hf: 1030.81,
                lf: 1277.989,
              },
              minute: '2025-10-14T03:10:00.000',
            },
            {
              value: {
                rmssd: 74.139,
                coverage: 0.933,
                hf: 798.525,
                lf: 1184.857,
              },
              minute: '2025-10-14T03:20:00.000',
            },
            {
              value: {
                rmssd: 29.505,
                coverage: 0.927,
                hf: 297.017,
                lf: 1175.56,
              },
              minute: '2025-10-14T03:25:00.000',
            },
            {
              value: {
                rmssd: 74.782,
                coverage: 0.914,
                hf: 705.827,
                lf: 1793.416,
              },
              minute: '2025-10-14T03:40:00.000',
            },
            {
              value: {
                rmssd: 71.871,
                coverage: 0.936,
                hf: 969.725,
                lf: 471.999,
              },
              minute: '2025-10-14T03:45:00.000',
            },
            {
              value: {
                rmssd: 90.507,
                coverage: 1.002,
                hf: 1338.95,
                lf: 757.661,
              },
              minute: '2025-10-14T03:50:00.000',
            },
            {
              value: {
                rmssd: 128.997,
                coverage: 0.946,
                hf: 2488.285,
                lf: 829.574,
              },
              minute: '2025-10-14T04:00:00.000',
            },
            {
              value: {
                rmssd: 105.231,
                coverage: 0.942,
                hf: 1501.178,
                lf: 331.256,
              },
              minute: '2025-10-14T04:20:00.000',
            },
            {
              value: {
                rmssd: 108.002,
                coverage: 0.873,
                hf: 1577.863,
                lf: 1426.896,
              },
              minute: '2025-10-14T04:25:00.000',
            },
            {
              value: {
                rmssd: 86.191,
                coverage: 1.004,
                hf: 1206.419,
                lf: 482.541,
              },
              minute: '2025-10-14T04:30:00.000',
            },
            {
              value: {
                rmssd: 86.051,
                coverage: 1.001,
                hf: 1432.504,
                lf: 413.246,
              },
              minute: '2025-10-14T04:35:00.000',
            },
            {
              value: {
                rmssd: 76.834,
                coverage: 1.005,
                hf: 1134.286,
                lf: 388.081,
              },
              minute: '2025-10-14T04:40:00.000',
            },
            {
              value: {
                rmssd: 77.561,
                coverage: 1.005,
                hf: 1273.712,
                lf: 281.468,
              },
              minute: '2025-10-14T04:45:00.000',
            },
            {
              value: {
                rmssd: 84.567,
                coverage: 1.001,
                hf: 1020.75,
                lf: 2466.274,
              },
              minute: '2025-10-14T04:50:00.000',
            },
            {
              value: {
                rmssd: 74.39,
                coverage: 1.005,
                hf: 1142.572,
                lf: 166.714,
              },
              minute: '2025-10-14T04:55:00.000',
            },
            {
              value: {
                rmssd: 73.117,
                coverage: 0.873,
                hf: 1129.713,
                lf: 357.414,
              },
              minute: '2025-10-14T05:00:00.000',
            },
            {
              value: {
                rmssd: 77.315,
                coverage: 0.769,
                hf: 949.197,
                lf: 1287.311,
              },
              minute: '2025-10-14T05:05:00.000',
            },
            {
              value: {
                rmssd: 89.261,
                coverage: 0.715,
                hf: 1756.907,
                lf: 3544.92,
              },
              minute: '2025-10-14T05:10:00.000',
            },
            {
              value: {
                rmssd: 75.464,
                coverage: 0.79,
                hf: 1268.478,
                lf: 1082.202,
              },
              minute: '2025-10-14T05:30:00.000',
            },
            {
              value: {
                rmssd: 80.607,
                coverage: 0.729,
                hf: 946.016,
                lf: 2790.421,
              },
              minute: '2025-10-14T05:35:00.000',
            },
            {
              value: {
                rmssd: 100.47,
                coverage: 0.779,
                hf: 1601.679,
                lf: 2930.757,
              },
              minute: '2025-10-14T05:40:00.000',
            },
            {
              value: {
                rmssd: 85.194,
                coverage: 0.968,
                hf: 1320.485,
                lf: 5866.716,
              },
              minute: '2025-10-14T05:50:00.000',
            },
            {
              value: {
                rmssd: 53.26,
                coverage: 0.777,
                hf: 620.894,
                lf: 4851.49,
              },
              minute: '2025-10-14T05:55:00.000',
            },
            {
              value: {
                rmssd: 65.87,
                coverage: 0.906,
                hf: 650.705,
                lf: 2672.076,
              },
              minute: '2025-10-14T06:00:00.000',
            },
            {
              value: {
                rmssd: 79.297,
                coverage: 0.982,
                hf: 1174.452,
                lf: 2733.738,
              },
              minute: '2025-10-14T06:05:00.000',
            },
            {
              value: {
                rmssd: 85.332,
                coverage: 0.947,
                hf: 1247.196,
                lf: 6607.423,
              },
              minute: '2025-10-14T06:10:00.000',
            },
            {
              value: {
                rmssd: 73.544,
                coverage: 0.795,
                hf: 813.578,
                lf: 6011.86,
              },
              minute: '2025-10-14T06:15:00.000',
            },
            {
              value: {
                rmssd: 64.704,
                coverage: 0.819,
                hf: 1010.555,
                lf: 2084.832,
              },
              minute: '2025-10-14T06:20:00.000',
            },
            {
              value: {
                rmssd: 37.107,
                coverage: 1.003,
                hf: 239.076,
                lf: 956.103,
              },
              minute: '2025-10-14T06:25:00.000',
            },
            {
              value: {
                rmssd: 22.198,
                coverage: 0.726,
                hf: 117.927,
                lf: 539.171,
              },
              minute: '2025-10-14T06:30:00.000',
            },
            {
              value: {
                rmssd: 90.307,
                coverage: 0.851,
                hf: 1383.067,
                lf: 9080.806,
              },
              minute: '2025-10-14T07:30:00.000',
            },
            {
              value: {
                rmssd: 87.027,
                coverage: 0.983,
                hf: 1650.812,
                lf: 1554.714,
              },
              minute: '2025-10-14T07:35:00.000',
            },
            {
              value: {
                rmssd: 82.524,
                coverage: 0.938,
                hf: 1310.99,
                lf: 2339.539,
              },
              minute: '2025-10-14T07:40:00.000',
            },
            {
              value: {
                rmssd: 74.364,
                coverage: 1.005,
                hf: 1216.019,
                lf: 1202.025,
              },
              minute: '2025-10-14T07:45:00.000',
            },
            {
              value: {
                rmssd: 87.109,
                coverage: 0.955,
                hf: 1284.971,
                lf: 2648.302,
              },
              minute: '2025-10-14T07:50:00.000',
            },
            {
              value: {
                rmssd: 75.911,
                coverage: 0.913,
                hf: 1388.851,
                lf: 2662.252,
              },
              minute: '2025-10-14T07:55:00.000',
            },
            {
              value: {
                rmssd: 62.548,
                coverage: 1.003,
                hf: 1320.046,
                lf: 342.554,
              },
              minute: '2025-10-14T08:00:00.000',
            },
            {
              value: {
                rmssd: 66.518,
                coverage: 0.824,
                hf: 1317.98,
                lf: 367.929,
              },
              minute: '2025-10-14T08:05:00.000',
            },
            {
              value: {
                rmssd: 70.275,
                coverage: 0.9,
                hf: 1193.324,
                lf: 2493.988,
              },
              minute: '2025-10-14T08:10:00.000',
            },
            {
              value: {
                rmssd: 67.2,
                coverage: 0.918,
                hf: 744.026,
                lf: 2171.039,
              },
              minute: '2025-10-14T08:30:00.000',
            },
            {
              value: {
                rmssd: 67.444,
                coverage: 0.939,
                hf: 911.145,
                lf: 4310.475,
              },
              minute: '2025-10-14T08:35:00.000',
            },
            {
              value: {
                rmssd: 69.976,
                coverage: 0.989,
                hf: 1457.141,
                lf: 1684.807,
              },
              minute: '2025-10-14T08:40:00.000',
            },
            {
              value: {
                rmssd: 67.085,
                coverage: 0.991,
                hf: 1168.868,
                lf: 622.291,
              },
              minute: '2025-10-14T08:45:00.000',
            },
            {
              value: {
                rmssd: 67.336,
                coverage: 0.929,
                hf: 786.823,
                lf: 3916.351,
              },
              minute: '2025-10-14T08:50:00.000',
            },
          ],
          dateTime: '2025-10-14',
        },
      ],
    };

    const hrvIntradayResponse = HRVIntradayResponseFromJson(
      offsetFromUTCMillis,
      fitbitJson,
    );

    expect(hrvIntradayResponse.hRVIntraday).toBeDefined();
    expect(hrvIntradayResponse.hRVIntraday.length).toEqual(1);
    expect(hrvIntradayResponse.hRVIntraday[0].localDate).toEqual('2025-10-14');
    expect(hrvIntradayResponse.hRVIntraday[0].minutes.length).toEqual(50);

    expect(hrvIntradayResponse.hRVIntraday[0].minutes[0].minute).toEqual(
      new Date('2025-10-14T02:25:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[0].value.rmssd).toEqual(
      71.841,
    );

    expect(hrvIntradayResponse.hRVIntraday[0].minutes[1].minute).toEqual(
      new Date('2025-10-14T02:30:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[1].value.rmssd).toEqual(
      75.641,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[2].minute).toEqual(
      new Date('2025-10-14T02:35:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[2].value.rmssd).toEqual(
      79.315,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[3].minute).toEqual(
      new Date('2025-10-14T02:40:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[3].value.rmssd).toEqual(
      83.103,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[4].minute).toEqual(
      new Date('2025-10-14T03:00:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[4].value.rmssd).toEqual(
      77.341,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[5].minute).toEqual(
      new Date('2025-10-14T03:05:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[5].value.rmssd).toEqual(
      45.338,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[6].minute).toEqual(
      new Date('2025-10-14T03:10:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[6].value.rmssd).toEqual(
      63.953,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[7].minute).toEqual(
      new Date('2025-10-14T03:20:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[7].value.rmssd).toEqual(
      74.139,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[8].minute).toEqual(
      new Date('2025-10-14T03:25:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[8].value.rmssd).toEqual(
      29.505,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[9].minute).toEqual(
      new Date('2025-10-14T03:40:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[9].value.rmssd).toEqual(
      74.782,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[10].minute).toEqual(
      new Date('2025-10-14T03:45:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[10].value.rmssd).toEqual(
      71.871,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[11].minute).toEqual(
      new Date('2025-10-14T03:50:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[11].value.rmssd).toEqual(
      90.507,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[12].minute).toEqual(
      new Date('2025-10-14T04:00:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[12].value.rmssd).toEqual(
      128.997,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[13].minute).toEqual(
      new Date('2025-10-14T04:20:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[13].value.rmssd).toEqual(
      105.231,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[14].minute).toEqual(
      new Date('2025-10-14T04:25:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[14].value.rmssd).toEqual(
      108.002,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[15].minute).toEqual(
      new Date('2025-10-14T04:30:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[15].value.rmssd).toEqual(
      86.191,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[16].minute).toEqual(
      new Date('2025-10-14T04:35:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[16].value.rmssd).toEqual(
      86.051,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[17].minute).toEqual(
      new Date('2025-10-14T04:40:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[17].value.rmssd).toEqual(
      76.834,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[18].minute).toEqual(
      new Date('2025-10-14T04:45:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[18].value.rmssd).toEqual(
      77.561,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[19].minute).toEqual(
      new Date('2025-10-14T04:50:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[19].value.rmssd).toEqual(
      84.567,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[20].minute).toEqual(
      new Date('2025-10-14T04:55:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[20].value.rmssd).toEqual(
      74.39,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[21].minute).toEqual(
      new Date('2025-10-14T05:00:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[21].value.rmssd).toEqual(
      73.117,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[22].minute).toEqual(
      new Date('2025-10-14T05:05:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[22].value.rmssd).toEqual(
      77.315,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[23].minute).toEqual(
      new Date('2025-10-14T05:10:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[23].value.rmssd).toEqual(
      89.261,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[24].minute).toEqual(
      new Date('2025-10-14T05:30:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[24].value.rmssd).toEqual(
      75.464,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[25].minute).toEqual(
      new Date('2025-10-14T05:35:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[25].value.rmssd).toEqual(
      80.607,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[26].minute).toEqual(
      new Date('2025-10-14T05:40:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[26].value.rmssd).toEqual(
      100.47,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[27].minute).toEqual(
      new Date('2025-10-14T05:50:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[27].value.rmssd).toEqual(
      85.194,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[28].minute).toEqual(
      new Date('2025-10-14T05:55:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[28].value.rmssd).toEqual(
      53.26,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[29].minute).toEqual(
      new Date('2025-10-14T06:00:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[29].value.rmssd).toEqual(
      65.87,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[30].minute).toEqual(
      new Date('2025-10-14T06:05:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[30].value.rmssd).toEqual(
      79.297,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[31].minute).toEqual(
      new Date('2025-10-14T06:10:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[31].value.rmssd).toEqual(
      85.332,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[32].minute).toEqual(
      new Date('2025-10-14T06:15:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[32].value.rmssd).toEqual(
      73.544,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[33].minute).toEqual(
      new Date('2025-10-14T06:20:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[33].value.rmssd).toEqual(
      64.704,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[34].minute).toEqual(
      new Date('2025-10-14T06:25:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[34].value.rmssd).toEqual(
      37.107,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[35].minute).toEqual(
      new Date('2025-10-14T06:30:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[35].value.rmssd).toEqual(
      22.198,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[36].minute).toEqual(
      new Date('2025-10-14T07:30:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[36].value.rmssd).toEqual(
      90.307,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[37].minute).toEqual(
      new Date('2025-10-14T07:35:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[37].value.rmssd).toEqual(
      87.027,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[38].minute).toEqual(
      new Date('2025-10-14T07:40:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[38].value.rmssd).toEqual(
      82.524,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[39].minute).toEqual(
      new Date('2025-10-14T07:45:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[39].value.rmssd).toEqual(
      74.364,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[40].minute).toEqual(
      new Date('2025-10-14T07:50:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[40].value.rmssd).toEqual(
      87.109,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[41].minute).toEqual(
      new Date('2025-10-14T07:55:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[41].value.rmssd).toEqual(
      75.911,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[42].minute).toEqual(
      new Date('2025-10-14T08:00:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[42].value.rmssd).toEqual(
      62.548,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[43].minute).toEqual(
      new Date('2025-10-14T08:05:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[43].value.rmssd).toEqual(
      66.518,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[44].minute).toEqual(
      new Date('2025-10-14T08:10:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[44].value.rmssd).toEqual(
      70.275,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[45].minute).toEqual(
      new Date('2025-10-14T08:30:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[45].value.rmssd).toEqual(
      67.2,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[46].minute).toEqual(
      new Date('2025-10-14T08:35:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[46].value.rmssd).toEqual(
      67.444,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[47].minute).toEqual(
      new Date('2025-10-14T08:40:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[47].value.rmssd).toEqual(
      69.976,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[48].minute).toEqual(
      new Date('2025-10-14T08:45:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[48].value.rmssd).toEqual(
      67.085,
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[49].minute).toEqual(
      new Date('2025-10-14T08:50:00.000+09:00'),
    );
    expect(hrvIntradayResponse.hRVIntraday[0].minutes[49].value.rmssd).toEqual(
      67.336,
    );
  });
});
