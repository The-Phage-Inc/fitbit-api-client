import { BaseApi, TokenRequestOptions } from './base.api';
import { UtcDate, DetailLevel } from '../types';
import { HeartRateResponse, HeartRateResponseFromJson } from '../models';

interface GetHeartRateIntradayByDateRequest {
  utcDate: UtcDate;
  detailLevel: DetailLevel;
}

export class HeartRateApi extends BaseApi {
  override scope = 'heartrate' as const;

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
    const { utcDate, detailLevel } = request;
    const path = `/1/user/-/activities/heart/date/${utcDate}/1d/${detailLevel}.json?timezone=UTC`;
    const response = await this.get(path, options);
    return HeartRateResponseFromJson(utcDate, response);
  }
}
