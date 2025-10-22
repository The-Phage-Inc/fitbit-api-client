import { BaseApi, TokenRequestOptions } from './base.api';
import { DetailLevel } from '../types';
import {
  HeartRateResponse,
  HeartRateResponseFromJson,
  HRVIntradayResponse,
  HRVIntradayResponseFromJson,
  HRVSummaryResponse,
  HRVSummaryResponseFromJson,
} from '../models';
import { validateDateString } from '../utils/date.utils';

interface GetHeartRateIntradayByDateRequest {
  /**
   * 端末のタイムゾーンでの日付
   * 'YYYY-MM-DD'
   */
  localDate: string;
  detailLevel: DetailLevel;
}

interface GetHRVSummaryByDateRequest {
  /**
   * 端末のタイムゾーンでの日付
   * 'YYYY-MM-DD'
   */
  localDate: string;
}

interface GetHRVIntradayRequest {
  /**
   * 端末のタイムゾーンでの日付
   * 'YYYY-MM-DD'
   */
  localDate: string;
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

  async getHRVSummaryByDate(
    request: GetHRVSummaryByDateRequest,
    options: TokenRequestOptions,
  ): Promise<HRVSummaryResponse> {
    return HRVSummaryResponseFromJson(
      await this.getHRVSummaryByDateRaw(request, options),
    );
  }

  async getHRVSummaryByDateRaw(
    request: GetHRVSummaryByDateRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    const { localDate } = request;
    validateDateString(localDate);
    const path = `/1/user/-/hrv/date/${localDate}.json`;
    return this.get(path, options);
  }

  async getHRVIntradayByDate(
    request: GetHRVIntradayRequest,
    options: TokenRequestOptions,
  ): Promise<HRVIntradayResponse> {
    return HRVIntradayResponseFromJson(
      await this.getHRVIntradayByDateRaw(request, options),
    );
  }

  async getHRVIntradayByDateRaw(
    request: GetHRVIntradayRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    const { localDate } = request;
    validateDateString(localDate);
    const path = `/1/user/-/hrv/${localDate}/all.json`;
    return this.get(path, options);
  }
}
