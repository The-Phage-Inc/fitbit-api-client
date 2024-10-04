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
   */
  activitiesStepsIntraday: ActivitiesStepsIntraday;
}

export interface StepsDailyData {
  /**
   * 歩数
   */
  steps: number;
  /**
   * 日付
   * toUTCString()を使用した際に "Wed, 01 Dec 2021 00:00:00 GMT" のような形式になる想定
   */
  date: Date;
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
  datasetType: 'second' | 'minute';
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
