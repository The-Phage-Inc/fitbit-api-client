import { get } from '../utils/types.utils';
import { Gender } from '../types';

/**
 * プロフィール情報レスポンス
 */
export interface ProfileResponse {
  user: UserData;
}

export function ProfileResponseFromJson(json: unknown): ProfileResponse {
  return {
    user: UserDataFromJson(get<unknown>(json, 'user')),
  };
}

/**
 * ユーザー情報
 * TODO 他のプロパティの追加
 */
export interface UserData {
  // 年齢
  age: number;
  /**
   * 生年月日
   * 'yyyy-MM-dd'
   */
  dateOfBirth: string;
  // 表示名
  displayName: string;
  // ID
  encodedId: string;
  // フルネーム
  fullName: string;
  // 名
  firstName: string;
  // 姓
  lastName: string;
  // 性別
  gender: Gender;
  // 身長
  height: number;
  // UTCからのオフセット
  offsetFromUTCMillis: number;
}

function UserDataFromJson(json: unknown): UserData {
  return {
    age: get<number>(json, 'age'),
    dateOfBirth: get<string>(json, 'dateOfBirth'),
    displayName: get<string>(json, 'displayName'),
    encodedId: get<string>(json, 'encodedId'),
    fullName: get<string>(json, 'fullName'),
    firstName: get<string>(json, 'firstName'),
    lastName: get<string>(json, 'lastName'),
    gender: get<Gender>(json, 'gender'),
    height: get<number>(json, 'height'),
    offsetFromUTCMillis: get<number>(json, 'offsetFromUTCMillis'),
  };
}