import { BaseApi, TokenRequestOptions } from './base.api';
import { DATE, DetailLevel } from '../types';
import { HeartRateResponse, HeartRateResponseFromJson } from '../models';

interface GetHeartRateIntradayByDateRequest {
  userId: string;
  utcDate: DATE;
  detailLevel: DetailLevel;
  timezone: 'UTC';
}

export class HeartRateApi extends BaseApi {
  getScope = () => 'heartrate' as const;

  /**
   * 心拍数取得API
   * https://dev.fitbit.com/build/reference/web-api/intraday/get-heartrate-intraday-by-date/
   * @param request
   * @param options
   */
  async getHeartRateIntradayByDate(
    request: GetHeartRateIntradayByDateRequest,
    options: TokenRequestOptions,
  ): Promise<HeartRateResponse> {
    const { userId, utcDate, detailLevel, timezone } = request;

    // クエリパラメータを `URLSearchParams` を使って構築
    const params = new URLSearchParams();
    if (timezone) {
      params.append('timezone', timezone);
    }
    // クエリパラメータがあれば追加
    const queryString = params.toString() ? `?${params.toString()}` : '';

    const path = `/1/user/${userId}/activities/heart/date/${utcDate}/1d/${detailLevel}.json`;
    const response = await this.get(`${path}${queryString}`, options);
    return HeartRateResponseFromJson(utcDate, response);
  }
}
