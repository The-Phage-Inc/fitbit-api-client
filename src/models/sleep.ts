import { exists, get } from '../utils/types.utils';
import { SleepLevel } from '../types';
import { convertToOffsetDate } from '../utils/date.utils';

/**
 * 睡眠データのレスポンス
 */
export interface SleepResponse {
  /**
   * 睡眠のデータ一覧
   */
  sleeps: SleepData[];
  /**
   * 睡眠のサマリー
   */
  summary: SleepSummary;
}

export function SleepResponseFromJson(
  offsetFromUTCMillis: number,
  json: unknown,
): SleepResponse {
  const sleeps = get<unknown[]>(json, 'sleep').map((data) =>
    SleepDataFromJson(offsetFromUTCMillis, data),
  );
  return {
    sleeps,
    summary: SleepSummaryFromJson(get<unknown>(json, 'summary')),
  };
}

/**
 * 各日付の睡眠データ
 */
export interface SleepData {
  /**
   * 睡眠の日付
   * 'yyyy-MM-dd'
   */
  dateOfSleep: string;
  /**
   * 睡眠時間（ミリ秒）
   * @type {number}
   */
  duration: number;
  /**
   * 睡眠の効率（%）
   */
  efficiency: number;
  /**
   * 睡眠の終了時間
   * @type {Date}
   */
  endTime: Date;
  /**
   * 睡眠の情報コード
   * 0 = 睡眠ログを生成するのに十分なデータ。
   * 1 = 心拍数データが不十分です。
   * 2 = 睡眠時間が短すぎます（3 時間未満）。
   * 3 = サーバー側の問題。
   */
  infoCode: 0 | 1 | 2 | 3;
  /**
   * メインの睡眠かどうか
   */
  isMainSleep: boolean;
  /**
   * 睡眠ステージの詳細データ
   */
  levels: SleepLevels;
  /**
   * 睡眠のID
   */
  logId: bigint;
  logType: 'auto_detected' | 'manual';
  minutesAfterWakeup: number;
  minutesAsleep: number;
  minutesAwake: number;
  minutesToFallAsleep: number;
  /**
   * 睡眠の開始時間
   * @type {Date}
   */
  startTime: Date;
  timeInBed: number;
  type: 'stages' | 'classic';
}

function SleepDataFromJson(
  offsetFromUTCMillis: number,
  json: unknown,
): SleepData {
  return {
    dateOfSleep: get<string>(json, 'dateOfSleep'),
    duration: get<number>(json, 'duration'),
    efficiency: get<number>(json, 'efficiency'),
    endTime: convertToOffsetDate(
      new Date(`${get<string>(json, 'endTime')}Z`),
      offsetFromUTCMillis,
    ),
    infoCode: get<0 | 1 | 2 | 3>(json, 'infoCode'),
    isMainSleep: get<boolean>(json, 'isMainSleep'),
    levels: SleepLevelsFromJson(
      offsetFromUTCMillis,
      get<unknown>(json, 'levels'),
    ),
    logId: get<bigint>(json, 'logId'),
    logType: get<'auto_detected' | 'manual'>(json, 'logType'),
    minutesAfterWakeup: get<number>(json, 'minutesAfterWakeup'),
    minutesAsleep: get<number>(json, 'minutesAsleep'),
    minutesAwake: get<number>(json, 'minutesAwake'),
    minutesToFallAsleep: get<number>(json, 'minutesToFallAsleep'),
    startTime: convertToOffsetDate(
      new Date(`${get<string>(json, 'startTime')}Z`),
      offsetFromUTCMillis,
    ),
    timeInBed: get<number>(json, 'timeInBed'),
    type: get<'stages' | 'classic'>(json, 'type'),
  };
}

/**
 * 睡眠のステージ情報
 */
export interface SleepLevels {
  /**
   * 睡眠レベルのデータセット
   */
  data: SleepLevelData[];
  /**
   * 短いデータセット
   * ※typeがstagesの場合のみ含まれます。
   * @type {SleepLevelData[]}
   */
  shortData?: SleepLevelData[];
  /**
   * 睡眠レベルのサマリ
   */
  summary: SleepLevelSummaryStages | SleepLevelSummaryClassic;
}

function SleepLevelsFromJson(
  offsetFromUTCMillis: number,
  json: unknown,
): SleepLevels {
  const summaryJson = get<unknown>(json, 'summary');
  const summary = exists(summaryJson, 'asleep')
    ? SleepLevelSummaryClassicFromJson(summaryJson)
    : SleepLevelSummaryStagesFromJson(summaryJson);
  const shortData = exists(json, 'shortData')
    ? get<unknown[]>(json, 'shortData').map((data) =>
        SleepLevelDataFromJson(offsetFromUTCMillis, data),
      )
    : undefined;
  return {
    data: get<unknown[]>(json, 'data').map((data) =>
      SleepLevelDataFromJson(offsetFromUTCMillis, data),
    ),
    shortData,
    summary,
  };
}

/**
 * 睡眠レベルのデータ
 */
export interface SleepLevelData {
  /**
   * 睡眠レベル
   * @type {SleepLevel}
   */
  level: SleepLevel;
  /**
   * ステージの開始時間
   */
  dateTime: Date;
  /**
   * ステージの持続時間（秒）
   */
  seconds: number;
}

function SleepLevelDataFromJson(
  offsetFromUTCMillis: number,
  json: unknown,
): SleepLevelData {
  return {
    level: get<SleepLevel>(json, 'level'),
    dateTime: convertToOffsetDate(
      new Date(`${get<string>(json, 'dateTime')}Z`),
      offsetFromUTCMillis,
    ),
    seconds: get<number>(json, 'seconds'),
  };
}

export interface SleepLevelSummaryClassic {
  asleep: SleepLevelSummaryClassicItem;
  awake: SleepLevelSummaryClassicItem;
  restless: SleepLevelSummaryClassicItem;
}

function SleepLevelSummaryClassicFromJson(
  json: unknown,
): SleepLevelSummaryClassic {
  return {
    asleep: SleepLevelSummaryClassicItemFromJson(get<unknown>(json, 'asleep')),
    awake: SleepLevelSummaryClassicItemFromJson(get<unknown>(json, 'awake')),
    restless: SleepLevelSummaryClassicItemFromJson(
      get<unknown>(json, 'restless'),
    ),
  };
}

/**
 * 睡眠レベルのサマリー
 */
export interface SleepLevelSummaryStages {
  deep: SleepLevelSummaryStagesItem;
  light: SleepLevelSummaryStagesItem;
  rem: SleepLevelSummaryStagesItem;
  wake: SleepLevelSummaryStagesItem;
}

function SleepLevelSummaryStagesFromJson(
  json: unknown,
): SleepLevelSummaryStages {
  return {
    deep: SleepLevelSummaryStagesItemFromJson(get<unknown>(json, 'deep')),
    light: SleepLevelSummaryStagesItemFromJson(get<unknown>(json, 'light')),
    rem: SleepLevelSummaryStagesItemFromJson(get<unknown>(json, 'rem')),
    wake: SleepLevelSummaryStagesItemFromJson(get<unknown>(json, 'wake')),
  };
}

export interface SleepLevelSummaryStagesItem {
  count: number;
  minutes: number;
  thirtyDayAvgMinutes: number;
}

function SleepLevelSummaryStagesItemFromJson(
  json: unknown,
): SleepLevelSummaryStagesItem {
  return {
    count: get<number>(json, 'count'),
    minutes: get<number>(json, 'minutes'),
    thirtyDayAvgMinutes: get<number>(json, 'thirtyDayAvgMinutes'),
  };
}

export interface SleepLevelSummaryClassicItem {
  count: number;
  minutes: number;
}

function SleepLevelSummaryClassicItemFromJson(
  json: unknown,
): SleepLevelSummaryClassicItem {
  return {
    count: get<number>(json, 'count'),
    minutes: get<number>(json, 'minutes'),
  };
}

/**
 * 睡眠のサマリー全体
 */
export interface SleepSummary {
  /**
   * 睡眠ステージのサマリー
   * ※typeがstagesの場合のみ含まれます。
   */
  stages?: SleepSummaryStages;
  /**
   * 合計睡眠時間（ミリ秒）
   */
  totalMinutesAsleep: number;
  totalSleepRecords: number;
  /**
   * 合計ベッド時間（ミリ秒）
   */
  totalTimeInBed: number;
}

function SleepSummaryFromJson(json: unknown): SleepSummary {
  const stages = exists(json, 'stages')
    ? SleepSummaryStagesFromJson(get<unknown>(json, 'stages'))
    : undefined;
  return {
    stages,
    totalMinutesAsleep: get<number>(json, 'totalMinutesAsleep'),
    totalSleepRecords: get<number>(json, 'totalSleepRecords'),
    totalTimeInBed: get<number>(json, 'totalTimeInBed'),
  };
}

export interface SleepSummaryStages {
  deep: number;
  light: number;
  rem: number;
  wake: number;
}

function SleepSummaryStagesFromJson(json: unknown): SleepSummaryStages {
  return {
    deep: get<number>(json, 'deep'),
    light: get<number>(json, 'light'),
    rem: get<number>(json, 'rem'),
    wake: get<number>(json, 'wake'),
  };
}
