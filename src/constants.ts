// API base URL
export const FITBIT_API_BASE_URL = 'https://api.fitbit.com';
// 認可ページURL
export const FITBIT_AUTH_URL = 'https://www.fitbit.com/oauth2/authorize';
// OAuthで使用する定数
export const CODE_CHALLENGE_METHOD = 'S256';

export const ACTIVITY_SCOPE = 'activity';
export const CARDIO_FITNESS_SCOPE = 'cardio_fitness';
export const ELECTROCARDIOGRAM_SCOPE = 'electrocardiogram';
export const HEARTRATE_SCOPE = 'heartrate';
export const LOCATION_SCOPE = 'location';
export const NUTRITION_SCOPE = 'nutrition';
export const OXYGEN_SATURATION_SCOPE = 'oxygen_saturation';
export const PROFILE_SCOPE = 'profile';
export const RESPIRATORY_RATE_SCOPE = 'respiratory_rate';
export const SETTINGS_SCOPE = 'settings';
export const SLEEP_SCOPE = 'sleep';
export const SOCIAL_SCOPE = 'social';
export const TEMPERATURE_SCOPE = 'temperature';
export const WEIGHT_SCOPE = 'weight';

// スコープ一覧
export const FITBIT_SCOPES = [
  ACTIVITY_SCOPE,
  CARDIO_FITNESS_SCOPE,
  ELECTROCARDIOGRAM_SCOPE,
  HEARTRATE_SCOPE,
  LOCATION_SCOPE,
  NUTRITION_SCOPE,
  OXYGEN_SATURATION_SCOPE,
  PROFILE_SCOPE,
  RESPIRATORY_RATE_SCOPE,
  SETTINGS_SCOPE,
  SLEEP_SCOPE,
  SOCIAL_SCOPE,
  TEMPERATURE_SCOPE,
  WEIGHT_SCOPE,
] as const;

export const STAGES_SLEEP_LEVELS = ['deep', 'light', 'rem', 'wake'] as const;
export const CLASSIC_SLEEP_LEVELS = ['restless', 'asleep', 'awake'] as const;
