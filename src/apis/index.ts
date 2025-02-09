import { OAuthApi } from './oauth.api';
import { HeartRateApi } from './heart-rate.api';
import { ActivityApi } from './activity.api';
import { SleepApi } from './sleep.api';
import { TemperatureApi } from './temperature.api';
import { SpO2Api } from './spo2.api';
import { ProfileApi } from './profile.api';
import { BodyApi } from './body.api';

export const oauthApi = new OAuthApi();
export const profileAPi = new ProfileApi();
export const heartRateApi = new HeartRateApi();
export const activityApi = new ActivityApi();
export const sleepApi = new SleepApi();
export const temperatureApi = new TemperatureApi();
export const spO2Api = new SpO2Api();
export const bodyApi = new BodyApi();
