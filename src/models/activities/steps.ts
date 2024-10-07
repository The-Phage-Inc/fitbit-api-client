import { DatasetType, DATE } from '../../types';
import { exists, get } from '../../utils/types.utils';

/**
 * 歩数データのレスポンス
 */
export interface StepsResponse {
  /**
   * 歩数のデータ一覧
   */
  activitiesSteps: StepsDailyData[];
  /**
   * 歩数の詳細データ
   * 取得にはIntradayの申請もしくはApplicationTypeがPersonalである必要があります。
   */
  activitiesStepsIntraday?: ActivitiesStepsIntraday;
}

export function StepsResponseFromJson(
  utcDate: DATE,
  json: unknown,
): StepsResponse {
  const activitiesSteps = get<unknown[]>(json, 'activities-steps').map((data) =>
    StepsDailyDataFromJson(data),
  );
  const activitiesStepsIntraday = exists(json, 'activities-steps-intraday')
    ? ActivitiesStepsIntradayFromJson(
        utcDate,
        get<unknown>(json, 'activities-steps-intraday'),
      )
    : undefined;
  return {
    activitiesSteps,
    activitiesStepsIntraday,
  };
}

export interface StepsDailyData {
  /**
   * 歩数
   */
  steps: number;
  /**
   * UTCの日付
   * 'yyyy-MM-dd'
   */
  utcDate: DATE;
}

function StepsDailyDataFromJson(json: unknown): StepsDailyData {
  return {
    steps: get<number>(json, 'value'),
    utcDate: get<DATE>(json, 'dateTime'),
  };
}

/**
 * 歩数の詳細データ
 * 取得にはIntradayの申請もしくはApplicationTypeがPersonalである必要があります。
 */
export interface ActivitiesStepsIntraday {
  /**
   * 歩数の詳細データ一覧
   */
  dataset: StepsIntradayData[];
  /**
   * データセットの間隔
   */
  datasetInterval: number;
  /**
   * データセットの種類
   */
  datasetType: DatasetType;
}

function ActivitiesStepsIntradayFromJson(
  utcDate: DATE,
  json: unknown,
): ActivitiesStepsIntraday {
  return {
    dataset: get<unknown[]>(json, 'dataset').map((data) =>
      StepsIntradayDataFromJson(utcDate, data),
    ),
    datasetInterval: get<number>(json, 'datasetInterval'),
    datasetType: get<DatasetType>(json, 'datasetType'),
  };
}

/**
 * 歩数の詳細データ
 */
export interface StepsIntradayData {
  /**
   * 時間
   * @type {Date}
   */
  dateTime: Date;
  /**
   * 歩数
   * @type {number}
   */
  steps: number;
}

function StepsIntradayDataFromJson(
  utcDate: DATE,
  json: unknown,
): StepsIntradayData {
  return {
    dateTime: new Date(`${utcDate}T${get<string>(json, 'time')}Z`),
    steps: get<number>(json, 'value'),
  };
}
