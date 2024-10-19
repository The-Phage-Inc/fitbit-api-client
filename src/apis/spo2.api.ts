import { BaseApi, TokenRequestOptions } from './base.api';
import { UtcDate } from '../types';
import {
  SpO2IntradayResponse,
  SpO2IntradayResponseFromJson,
} from '../models/spo2/spo2';

interface GetSpO2IntradayByDateRequest {
  utcDate: UtcDate;
}

export class SpO2Api extends BaseApi {
  override scope = 'oxygen_saturation' as const;

  /**
   * 酸素飽和度取得API
   * https://dev.fitbit.com/build/reference/web-api/intraday/get-spo2-intraday-by-date/
   * @param request
   * @param options
   */
  async getSpo2IntradayByDate(
    request: GetSpO2IntradayByDateRequest,
    options: TokenRequestOptions,
  ): Promise<SpO2IntradayResponse> {
    return SpO2IntradayResponseFromJson(
      await this.getSpO2IntradayByDateRaw(request, options),
    );
  }

  async getSpO2IntradayByDateRaw(
    request: GetSpO2IntradayByDateRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    const { utcDate } = request;
    const path = `/1/user/-/spo2/date/${utcDate}/all.json`;
    return this.get(path, options);
  }
}
