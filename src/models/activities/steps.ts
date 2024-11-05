import { DatasetType } from '../../types';
import { exists, get } from '../../utils/types.utils';
import { convertToOffsetDate } from '../../utils/date.utils';

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
  localDate: string,
  offsetFromUTCMillis: number,
  json: unknown,
): StepsResponse {
  const activitiesSteps = get<unknown[]>(json, 'activities-steps').map((data) =>
    StepsDailyDataFromJson(data),
  );
  const activitiesStepsIntraday = exists(json, 'activities-steps-intraday')
    ? ActivitiesStepsIntradayFromJson(
        localDate,
        offsetFromUTCMillis,
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
   * ローカル日付
   * 'yyyy-MM-dd'
   */
  localDate: string;
}

function StepsDailyDataFromJson(json: unknown): StepsDailyData {
  return {
    steps: get<number>(json, 'value'),
    localDate: get<string>(json, 'dateTime'),
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
  localDate: string,
  offsetFromUTCMillis: number,
  json: unknown,
): ActivitiesStepsIntraday {
  return {
    dataset: get<unknown[]>(json, 'dataset').map((data) =>
      StepsIntradayDataFromJson(localDate, offsetFromUTCMillis, data),
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
  localDate: string,
  offsetFromUTCMillis: number,
  json: unknown,
): StepsIntradayData {
  return {
    dateTime: convertToOffsetDate(
      new Date(`${localDate}T${get<string>(json, 'time')}Z`),
      offsetFromUTCMillis,
    ),
    steps: get<number>(json, 'value'),
  };
}
