import { BaseApi, TokenRequestOptions } from './base.api';
import { DetailLevel } from '../types';
import { HeartRateResponse, HeartRateResponseFromJson } from '../models';
import { validateDateString } from '../utils/date.utils';

interface GetHeartRateIntradayByDateRequest {
  localDate: string;
  detailLevel: DetailLevel;
}

export class HeartRateApi extends BaseApi {
  override scope = 'heartrate' as const;

  /**
   * 心拍数取得API
   * https://dev.fitbit.com/build/reference/web-api/intraday/get-heartrate-intraday-by-date/
   * @param request
   * @param offsetFromUTCMillis
   * @param options
   */
  async getHeartRateIntradayByDate(
    request: GetHeartRateIntradayByDateRequest,
    offsetFromUTCMillis: number,
    options: TokenRequestOptions,
  ): Promise<HeartRateResponse> {
    const { localDate } = request;
    return HeartRateResponseFromJson(
      localDate,
      offsetFromUTCMillis,
      await this.getHeartRateIntradayByDateRaw(request, options),
    );
  }

  async getHeartRateIntradayByDateRaw(
    request: GetHeartRateIntradayByDateRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    const { localDate, detailLevel } = request;
    validateDateString(localDate);
    const path = `/1/user/-/activities/heart/date/${localDate}/1d/${detailLevel}.json`;
    return this.get(path, options);
  }
}
