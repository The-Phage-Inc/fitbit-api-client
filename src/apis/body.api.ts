import { BaseApi, TokenRequestOptions } from './base.api';
import { validateDateString } from '../utils/date.utils';
import { WeightResponse, WeightResponseFromJson } from '../models/body';

interface GetWeightLogByDateRequest {
  /**
   * 端末のタイムゾーンでの日付
   * 'YYYY-MM-DD'
   */
  localDate: string;
}

export class BodyApi extends BaseApi {
  override scope = 'weight' as const;

  /**
   * 体重記録取得API
   * @param request
   * @param offsetFromUTCMillis
   * @param options
   */
  async getWeightLogByDate(
    request: GetWeightLogByDateRequest,
    offsetFromUTCMillis: number,
    options: TokenRequestOptions,
  ): Promise<WeightResponse> {
    return WeightResponseFromJson(
      offsetFromUTCMillis,
      await this.getWeightLogByDateRaw(request, options),
    );
  }

  /**
   * GetWeightLog
   * https://dev.fitbit.com/build/reference/web-api/body/get-weight-log/
   * @param request
   * @param options
   */
  async getWeightLogByDateRaw(
    request: GetWeightLogByDateRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    const { localDate } = request;
    validateDateString(localDate);
    const path = `/1/user/-/body/log/weight/date/${localDate}.json`;
    return this.get(path, options);
  }
}
