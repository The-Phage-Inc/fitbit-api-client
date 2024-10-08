import { DatasetType, UtcDate, ZoneName } from '../types';
import { exists, get } from '../utils/types.utils';

/**
 * 心拍数データのレスポンス
 */
export interface HeartRateResponse {
  /**
   * 心拍数のデータ一覧
   */
  activitiesHeart: HeartRateData[];
  /**
   * 心拍数の詳細データ
   * 取得にはIntradayの申請もしくはApplicationTypeがPersonalである必要があります。
   */
  activitiesHeartIntraday?: ActivitiesHeartIntraday;
}

export function HeartRateResponseFromJson(
  utcDate: UtcDate,
  json: unknown,
): HeartRateResponse {
  const activitiesHeart = get<unknown[]>(json, 'activities-heart').map((data) =>
    HeartRateDataFromJson(data),
  );
  const activitiesHeartIntraday = exists(json, 'activities-heart-intraday')
    ? ActivitiesHeartIntradayFromJson(
        utcDate,
        get<unknown>(json, 'activities-heart-intraday'),
      )
    : undefined;
  return {
    activitiesHeart,
    activitiesHeartIntraday,
  };
}

export interface HeartRateData {
  /**
   * UTCの日付
   * 'yyyy-MM-dd'
   */
  utcDate: UtcDate;
  /**
   * 心拍数
   */
  value: {
    restingHeartRate?: number;
    heartRateZones: HeartRateZone[];
    customHeartRateZones: HeartRateZone[];
  };
}

function HeartRateDataFromJson(json: unknown): HeartRateData {
  const value = get<unknown>(json, 'value');
  const heartRateZones = get<unknown[]>(value, 'heartRateZones').map((zone) =>
    HeartRateZoneFromJson(zone),
  );
  const customHeartRateZones = get<unknown[]>(
    value,
    'customHeartRateZones',
  ).map((zone) => HeartRateZoneFromJson(zone));
  return {
    utcDate: get<UtcDate>(json, 'dateTime'),
    value: {
      restingHeartRate: exists(value, 'restingHeartRate')
        ? get<number>(value, 'restingHeartRate')
        : undefined,
      heartRateZones,
      customHeartRateZones,
    },
  };
}

/**
 * 心拍数の詳細データ
 * 取得にはIntradayの申請もしくはApplicationTypeがPersonalである必要があります。
 */
export interface ActivitiesHeartIntraday {
  /**
   * 心拍数の詳細データ一覧
   */
  dataset: HeartRateIntradayData[];
  /**
   * データセットの間隔
   */
  datasetInterval: number;
  /**
   * データセットの種類
   */
  datasetType: DatasetType;
}

function ActivitiesHeartIntradayFromJson(
  utcDate: UtcDate,
  json: unknown,
): ActivitiesHeartIntraday {
  return {
    dataset: get<unknown[]>(json, 'dataset').map((data) =>
      HeartRateIntradayDataFromJson(utcDate, data),
    ),
    datasetInterval: get<number>(json, 'datasetInterval'),
    datasetType: get<DatasetType>(json, 'datasetType'),
  };
}

/**
 * 心拍数の詳細データ
 */
export interface HeartRateIntradayData {
  /**
   * 時間
   * @type {Date}
   */
  dateTime: Date;
  /**
   * 心拍数
   * @type {number}
   */
  value: number;
}

function HeartRateIntradayDataFromJson(
  date: UtcDate,
  json: unknown,
): HeartRateIntradayData {
  return {
    dateTime: new Date(`${date}T${get<string>(json, 'time')}Z`),
    value: get<number>(json, 'value'),
  };
}

export interface HeartRateZone {
  /**
   * このゾーンの名前('Out of Range' | 'Fat Burn' | 'Cardio' | 'Peak')
   */
  name: ZoneName;
  /**
   * このゾーンの心拍数の下限
   */
  min: number;
  /**
   * このゾーンの心拍数の上限
   */
  max: number;
  /**
   * このゾーンで過ごした時間（分）
   */
  minutes: number;
  /**
   * このゾーンにいた間に消費されたカロリー
   */
  caloriesOut: number;
}

function HeartRateZoneFromJson(json: unknown): HeartRateZone {
  return {
    name: get<ZoneName>(json, 'name'),
    min: get<number>(json, 'min'),
    max: get<number>(json, 'max'),
    minutes: get<number>(json, 'minutes'),
    caloriesOut: get<number>(json, 'caloriesOut'),
  };
}
