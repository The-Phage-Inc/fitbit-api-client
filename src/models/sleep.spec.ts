import { SleepResponseFromJson } from './sleep';

describe('Sleep', () => {
  it('問題なく型変換出来ること', () => {
    // Asia/Tokyoの場合
    const offsetFromUTCMillis = 32400000;
    const json = {
      sleep: [
        {
          dateOfSleep: '2024-10-07',
          duration: 18060000,
          efficiency: 86,
          endTime: '2024-10-07T10:09:00.000',
          infoCode: 0,
          isMainSleep: true,
          levels: {
            data: [
              {
                dateTime: '2024-10-07T05:07:30.000',
                level: 'wake',
                seconds: 420,
              },
              {
                dateTime: '2024-10-07T05:14:30.000',
                level: 'light',
                seconds: 480,
              },
              {
                dateTime: '2024-10-07T05:22:30.000',
                level: 'deep',
                seconds: 2040,
              },
              {
                dateTime: '2024-10-07T05:56:30.000',
                level: 'light',
                seconds: 1500,
              },
              {
                dateTime: '2024-10-07T06:21:30.000',
                level: 'deep',
                seconds: 420,
              },
              {
                dateTime: '2024-10-07T06:28:30.000',
                level: 'light',
                seconds: 990,
              },
              {
                dateTime: '2024-10-07T06:45:00.000',
                level: 'rem',
                seconds: 360,
              },
              {
                dateTime: '2024-10-07T06:51:00.000',
                level: 'light',
                seconds: 330,
              },
              {
                dateTime: '2024-10-07T06:56:30.000',
                level: 'wake',
                seconds: 270,
              },
              {
                dateTime: '2024-10-07T07:01:00.000',
                level: 'light',
                seconds: 1320,
              },
              {
                dateTime: '2024-10-07T07:23:00.000',
                level: 'deep',
                seconds: 780,
              },
              {
                dateTime: '2024-10-07T07:36:00.000',
                level: 'light',
                seconds: 2400,
              },
              {
                dateTime: '2024-10-07T08:16:00.000',
                level: 'rem',
                seconds: 1050,
              },
              {
                dateTime: '2024-10-07T08:33:30.000',
                level: 'light',
                seconds: 1560,
              },
              {
                dateTime: '2024-10-07T08:59:30.000',
                level: 'wake',
                seconds: 660,
              },
              {
                dateTime: '2024-10-07T09:10:30.000',
                level: 'light',
                seconds: 3240,
              },
              {
                dateTime: '2024-10-07T10:04:30.000',
                level: 'wake',
                seconds: 270,
              },
            ],
            shortData: [
              {
                dateTime: '2024-10-07T06:07:00.000',
                level: 'wake',
                seconds: 30,
              },
              {
                dateTime: '2024-10-07T06:12:00.000',
                level: 'wake',
                seconds: 30,
              },
              {
                dateTime: '2024-10-07T06:32:30.000',
                level: 'wake',
                seconds: 30,
              },
              {
                dateTime: '2024-10-07T06:35:30.000',
                level: 'wake',
                seconds: 30,
              },
              {
                dateTime: '2024-10-07T06:37:30.000',
                level: 'wake',
                seconds: 180,
              },
              {
                dateTime: '2024-10-07T06:43:00.000',
                level: 'wake',
                seconds: 120,
              },
              {
                dateTime: '2024-10-07T06:52:00.000',
                level: 'wake',
                seconds: 30,
              },
              {
                dateTime: '2024-10-07T07:04:00.000',
                level: 'wake',
                seconds: 150,
              },
              {
                dateTime: '2024-10-07T07:14:30.000',
                level: 'wake',
                seconds: 120,
              },
              {
                dateTime: '2024-10-07T07:47:30.000',
                level: 'wake',
                seconds: 60,
              },
              {
                dateTime: '2024-10-07T07:51:00.000',
                level: 'wake',
                seconds: 30,
              },
              {
                dateTime: '2024-10-07T07:55:00.000',
                level: 'wake',
                seconds: 30,
              },
              {
                dateTime: '2024-10-07T07:59:30.000',
                level: 'wake',
                seconds: 90,
              },
              {
                dateTime: '2024-10-07T08:09:00.000',
                level: 'wake',
                seconds: 60,
              },
              {
                dateTime: '2024-10-07T08:13:00.000',
                level: 'wake',
                seconds: 30,
              },
              {
                dateTime: '2024-10-07T08:19:00.000',
                level: 'wake',
                seconds: 30,
              },
              {
                dateTime: '2024-10-07T08:31:00.000',
                level: 'wake',
                seconds: 150,
              },
              {
                dateTime: '2024-10-07T08:45:30.000',
                level: 'wake',
                seconds: 30,
              },
              {
                dateTime: '2024-10-07T09:16:30.000',
                level: 'wake',
                seconds: 60,
              },
              {
                dateTime: '2024-10-07T09:21:30.000',
                level: 'wake',
                seconds: 150,
              },
              {
                dateTime: '2024-10-07T09:27:30.000',
                level: 'wake',
                seconds: 90,
              },
              {
                dateTime: '2024-10-07T09:39:30.000',
                level: 'wake',
                seconds: 120,
              },
              {
                dateTime: '2024-10-07T09:43:30.000',
                level: 'wake',
                seconds: 30,
              },
              {
                dateTime: '2024-10-07T09:58:30.000',
                level: 'wake',
                seconds: 30,
              },
            ],
            summary: {
              deep: { count: 3, minutes: 54, thirtyDayAvgMinutes: 39 },
              light: { count: 29, minutes: 172, thirtyDayAvgMinutes: 117 },
              rem: { count: 3, minutes: 20, thirtyDayAvgMinutes: 9 },
              wake: { count: 28, minutes: 55, thirtyDayAvgMinutes: 48 },
            },
          },
          logId: 47072650879,
          logType: 'auto_detected',
          minutesAfterWakeup: 4,
          minutesAsleep: 246,
          minutesAwake: 55,
          minutesToFallAsleep: 0,
          startTime: '2024-10-07T05:07:30.000',
          timeInBed: 301,
          type: 'stages',
        },
      ],
      summary: {
        stages: { deep: 54, light: 172, rem: 20, wake: 55 },
        totalMinutesAsleep: 246,
        totalSleepRecords: 1,
        totalTimeInBed: 301,
      },
    };

    const sleepResponse = SleepResponseFromJson(offsetFromUTCMillis, json);
    expect(sleepResponse.summary.stages).toEqual({
      deep: 54,
      light: 172,
      rem: 20,
      wake: 55,
    });
    expect(sleepResponse.summary.totalSleepRecords).toEqual(1);
    expect(sleepResponse.sleeps[0].startTime).toEqual(
      new Date('2024-10-07T05:07:30.000+09:00'),
    );
    expect(sleepResponse.sleeps[0].endTime).toEqual(
      new Date('2024-10-07T10:09:00.000+09:00'),
    );
    expect(sleepResponse.sleeps[0].levels.data[0].dateTime).toEqual(
      new Date('2024-10-07T05:07:30.000+09:00'),
    );
    expect(sleepResponse.sleeps[0].levels.data[16].dateTime).toEqual(
      new Date('2024-10-07T10:04:30.000+09:00'),
    );
  });

  it('typeがClassicの場合', () => {
    // Asia/Tokyoの場合
    const offsetFromUTCMillis = 32400000;
    const classicJson = {
      sleep: [
        {
          dateOfSleep: '2024-10-07',
          duration: 18060000,
          efficiency: 86,
          endTime: '2024-10-07T10:09:00.000',
          infoCode: 0,
          isMainSleep: true,
          levels: {
            data: [
              {
                dateTime: '2024-10-07T05:07:30.000',
                level: 'wake',
                seconds: 420,
              },
              {
                dateTime: '2024-10-07T05:14:30.000',
                level: 'light',
                seconds: 480,
              },
              {
                dateTime: '2024-10-07T05:22:30.000',
                level: 'deep',
                seconds: 2040,
              },
              {
                dateTime: '2024-10-07T05:56:30.000',
                level: 'light',
                seconds: 1500,
              },
              {
                dateTime: '2024-10-07T06:21:30.000',
                level: 'deep',
                seconds: 420,
              },
              {
                dateTime: '2024-10-07T06:28:30.000',
                level: 'light',
                seconds: 990,
              },
              {
                dateTime: '2024-10-07T06:45:00.000',
                level: 'rem',
                seconds: 360,
              },
              {
                dateTime: '2024-10-07T06:51:00.000',
                level: 'light',
                seconds: 330,
              },
              {
                dateTime: '2024-10-07T06:56:30.000',
                level: 'wake',
                seconds: 270,
              },
              {
                dateTime: '2024-10-07T07:01:00.000',
                level: 'light',
                seconds: 1320,
              },
              {
                dateTime: '2024-10-07T07:23:00.000',
                level: 'deep',
                seconds: 780,
              },
              {
                dateTime: '2024-10-07T07:36:00.000',
                level: 'light',
                seconds: 2400,
              },
              {
                dateTime: '2024-10-07T08:16:00.000',
                level: 'rem',
                seconds: 1050,
              },
              {
                dateTime: '2024-10-07T08:33:30.000',
                level: 'light',
                seconds: 1560,
              },
              {
                dateTime: '2024-10-07T08:59:30.000',
                level: 'wake',
                seconds: 660,
              },
              {
                dateTime: '2024-10-07T09:10:30.000',
                level: 'light',
                seconds: 3240,
              },
              {
                dateTime: '2024-10-07T10:04:30.000',
                level: 'wake',
                seconds: 270,
              },
            ],
            summary: {
              deep: { count: 3, minutes: 54, thirtyDayAvgMinutes: 39 },
              light: { count: 29, minutes: 172, thirtyDayAvgMinutes: 117 },
              rem: { count: 3, minutes: 20, thirtyDayAvgMinutes: 9 },
              wake: { count: 28, minutes: 55, thirtyDayAvgMinutes: 48 },
            },
          },
          logId: 47072650879,
          logType: 'auto_detected',
          minutesAfterWakeup: 4,
          minutesAsleep: 246,
          minutesAwake: 55,
          minutesToFallAsleep: 0,
          startTime: '2024-10-07T05:07:30.000',
          timeInBed: 301,
          type: 'classic',
        },
      ],
      summary: {
        totalMinutesAsleep: 246,
        totalSleepRecords: 1,
        totalTimeInBed: 301,
      },
    };
    SleepResponseFromJson(offsetFromUTCMillis, classicJson);
  });
});
