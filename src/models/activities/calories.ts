import { DatasetType } from '../../types';
import { exists, get } from '../../utils/types.utils';
import { convertToOffsetDate } from '../../utils/date.utils';

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
  localDate: string,
  offsetFromUTCMillis: number,
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
        localDate,
        offsetFromUTCMillis,
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
   * 端末の日付
   * 'yyyy-MM-dd'
   */
  localDate: string;
}

function CaloriesDailyDataFromJson(json: unknown): CaloriesDailyData {
  return {
    calories: get<number>(json, 'value'),
    localDate: get<string>(json, 'dateTime'),
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
  localDate: string,
  offsetFromUTCMillis: number,
  json: unknown,
): ActivitiesCaloriesIntraday {
  return {
    dataset: get<unknown[]>(json, 'dataset').map((data) =>
      ActivitiesCaloriesIntradayDataFromJson(
        localDate,
        offsetFromUTCMillis,
        data,
      ),
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
  localDate: string,
  offsetFromUTCMillis: number,
  json: unknown,
): CaloriesIntradayData {
  return {
    dateTime: convertToOffsetDate(
      new Date(`${localDate}T${get<string>(json, 'time')}Z`),
      offsetFromUTCMillis,
    ),
    calories: get<number>(json, 'value'),
  };
}
