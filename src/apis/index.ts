import { OAuthApi } from './oauth.api';
import { HeartRateApi } from './heart-rate.api';
import { ActivityApi } from './activity.api';
import { SleepApi } from './sleep.api';

export const oauthApi = new OAuthApi();
export const heartRateApi = new HeartRateApi();
export const activityApi = new ActivityApi();
export const sleepApi = new SleepApi();
