import { get } from '../utils/types.utils';
import { UtcDate } from '../types';

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

export function SleepResponseFromJson(json: unknown): SleepResponse {
  const sleeps = get<unknown[]>(json, 'sleep').map((data) =>
    SleepDataFromJson(data),
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
  dateOfSleep: UtcDate;
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
   */
  infoCode: number;
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

function SleepDataFromJson(json: unknown): SleepData {
  return {
    dateOfSleep: get<UtcDate>(json, 'dateOfSleep'),
    duration: get<number>(json, 'duration'),
    efficiency: get<number>(json, 'efficiency'),
    endTime: new Date(get<string>(json, 'endTime')),
    infoCode: get<number>(json, 'infoCode'),
    isMainSleep: get<boolean>(json, 'isMainSleep'),
    levels: SleepLevelsFromJson(get<unknown>(json, 'levels')),
    logId: get<bigint>(json, 'logId'),
    logType: get<'auto_detected' | 'manual'>(json, 'logType'),
    minutesAfterWakeup: get<number>(json, 'minutesAfterWakeup'),
    minutesAsleep: get<number>(json, 'minutesAsleep'),
    minutesAwake: get<number>(json, 'minutesAwake'),
    minutesToFallAsleep: get<number>(json, 'minutesToFallAsleep'),
    startTime: new Date(get<string>(json, 'startTime')),
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
   */
  shortData: SleepLevelData[];
  /**
   * 睡眠レベルのサマリ
   */
  summary: SleepLevelSummary;
}

function SleepLevelsFromJson(json: unknown): SleepLevels {
  return {
    data: get<unknown[]>(json, 'data').map((data) =>
      SleepLevelDataFromJson(data),
    ),
    shortData: get<unknown[]>(json, 'shortData').map((data) =>
      SleepLevelDataFromJson(data),
    ),
    summary: SleepLevelSummaryFromJsonFromJson(get<unknown>(json, 'summary')),
  };
}

/**
 * 睡眠レベルのデータ
 */
export interface SleepLevelData {
  /**
   * ステージ（deep, light, rem, wake）
   */
  level: 'deep' | 'light' | 'rem' | 'wake';
  /**
   * ステージの開始時間
   */
  dateTime: Date;
  /**
   * ステージの持続時間（秒）
   */
  seconds: number;
}

function SleepLevelDataFromJson(json: unknown): SleepLevelData {
  return {
    level: get<'deep' | 'light' | 'rem' | 'wake'>(json, 'level'),
    dateTime: new Date(get<string>(json, 'dateTime')),
    seconds: get<number>(json, 'seconds'),
  };
}

/**
 * 睡眠レベルのサマリー
 */
export interface SleepLevelSummary {
  deep: SleepLevelSummaryItem;
  light: SleepLevelSummaryItem;
  rem: SleepLevelSummaryItem;
  wake: SleepLevelSummaryItem;
}

function SleepLevelSummaryFromJsonFromJson(json: unknown): SleepLevelSummary {
  return {
    deep: SleepLevelSummaryItemFromJson(get<unknown>(json, 'deep')),
    light: SleepLevelSummaryItemFromJson(get<unknown>(json, 'light')),
    rem: SleepLevelSummaryItemFromJson(get<unknown>(json, 'rem')),
    wake: SleepLevelSummaryItemFromJson(get<unknown>(json, 'wake')),
  };
}

export interface SleepLevelSummaryItem {
  count: number;
  minutes: number;
  thirtyDayAvgMinutes: number;
}

function SleepLevelSummaryItemFromJson(json: unknown): SleepLevelSummaryItem {
  return {
    count: get<number>(json, 'count'),
    minutes: get<number>(json, 'minutes'),
    thirtyDayAvgMinutes: get<number>(json, 'thirtyDayAvgMinutes'),
  };
}

/**
 * 睡眠のサマリー全体
 */
export interface SleepSummary {
  /**
   * 睡眠ステージのサマリー
   */
  stages: SleepSummaryStages;
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
  return {
    stages: SleepSummaryStagesFromJson(get<unknown>(json, 'stages')),
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
