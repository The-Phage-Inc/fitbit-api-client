import { BaseApi, TokenRequestOptions } from './base.api';
import {
  SpO2IntradayResponse,
  SpO2IntradayResponseFromJson,
} from '../models/spo2/spo2';

interface GetSpO2IntradayByDateRequest {
  /**
   * 端末のタイムゾーンでの日付
   * 'YYYY-MM-DD'
   */
  localDate: string;
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
    offsetFromUTCMillis: number,
    options: TokenRequestOptions,
  ): Promise<SpO2IntradayResponse> {
    return SpO2IntradayResponseFromJson(
      await this.getSpO2IntradayByDateRaw(
        request,
        offsetFromUTCMillis,
        options,
      ),
    );
  }

  async getSpO2IntradayByDateRaw(
    request: GetSpO2IntradayByDateRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    const { localDate } = request;
    const path = `/1/user/-/spo2/date/${localDate}/all.json`;
    return this.get(path, options);
  }
}
