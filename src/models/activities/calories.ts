import { DatasetType, UtcDate } from '../../types';
import { exists, get } from '../../utils/types.utils';

/**
 * カロリーのデータ
 */
export interface CaloriesResponse {
  /**
   * カロリーのデータ一覧
   */
  activitiesCalories: CaloriesDailyData[];
  /**
   * カロリーの詳細データ
   * 取得にはIntradayの申請もしくはApplicationTypeがPersonalである必要があります。
   */
  activitiesCaloriesIntraday?: ActivitiesCaloriesIntraday;
}

export function CaloriesResponseFromJson(
  utcDate: UtcDate,
  json: unknown,
): CaloriesResponse {
  const activitiesCalories = get<unknown[]>(json, 'activities-calories').map(
    (data) => CaloriesDailyDataFromJson(data),
  );
  const activitiesCaloriesIntraday = exists(
    json,
    'activities-calories-intraday',
  )
    ? ActivitiesCaloriesIntradayFromJson(
        utcDate,
        get<unknown>(json, 'activities-calories-intraday'),
      )
    : undefined;
  return {
    activitiesCalories,
    activitiesCaloriesIntraday,
  };
}

export interface CaloriesDailyData {
  /**
   * カロリー
   */
  calories: number;
  /**
   * UTCの日付
   * 'yyyy-MM-dd'
   */
  utcDate: UtcDate;
}

function CaloriesDailyDataFromJson(json: unknown): CaloriesDailyData {
  return {
    calories: get<number>(json, 'value'),
    utcDate: get<UtcDate>(json, 'dateTime'),
  };
}

/**
 * カロリーの詳細データ
 * 取得にはIntradayの申請もしくはApplicationTypeがPersonalである必要があります。
 */
export interface ActivitiesCaloriesIntraday {
  /**
   * カロリーの詳細データ一覧
   */
  dataset: CaloriesIntradayData[];
  /**
   * データセットの間隔
   */
  datasetInterval: number;
  /**
   * データセットの種類
   */
  datasetType: DatasetType;
}

function ActivitiesCaloriesIntradayFromJson(
  utcDate: UtcDate,
  json: unknown,
): ActivitiesCaloriesIntraday {
  return {
    dataset: get<unknown[]>(json, 'dataset').map((data) =>
      ActivitiesCaloriesIntradayDataFromJson(utcDate, data),
    ),
    datasetInterval: get<number>(json, 'datasetInterval'),
    datasetType: get<DatasetType>(json, 'datasetType'),
  };
}

/**
 * カロリーの詳細データ
 */
export interface CaloriesIntradayData {
  /**
   * 時間
   * @type {Date}
   */
  dateTime: Date;
  /**
   * カロリー
   * @type {number}
   */
  calories: number;
}

function ActivitiesCaloriesIntradayDataFromJson(
  date: UtcDate,
  json: unknown,
): CaloriesIntradayData {
  return {
    dateTime: get<Date>(json, 'time'),
    calories: get<number>(json, 'value'),
  };
}
