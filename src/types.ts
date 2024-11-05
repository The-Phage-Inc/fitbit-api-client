import {
  CLASSIC_SLEEP_LEVELS,
  FITBIT_SCOPES,
  STAGES_SLEEP_LEVELS,
} from './constants';

export type FitbitScope = (typeof FITBIT_SCOPES)[number];

export type DetailLevel = '1sec' | MinuteDetailLevel;
export type MinuteDetailLevel = '1min' | '5min' | '15min';

export type ZoneName = 'Out of Range' | 'Fat Burn' | 'Cardio' | 'Peak';
export type DatasetType = 'second' | 'minute';

export type SleepLevel = StagesSleepLevel | ClassicSleepLevel;
export type StagesSleepLevel = (typeof STAGES_SLEEP_LEVELS)[number];
export type ClassicSleepLevel = (typeof CLASSIC_SLEEP_LEVELS)[number];
export type Gender = 'MALE' | 'FEMALE' | 'NA';
