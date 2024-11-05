import { BaseApi, TokenRequestOptions } from './base.api';
import { SleepResponse, SleepResponseFromJson } from '../models';

interface GetSleepByDateRequest {
  /**
   * 端末のタイムゾーンでの日付
   * 'YYYY-MM-DD'
   */
  localDate: string;
}

export class SleepApi extends BaseApi {
  override scope = 'sleep' as const;

  /**
   * 睡眠記録取得API
   * https://dev.fitbit.com/build/reference/web-api/sleep/get-sleep-log-by-date/
   */
  async getSleepLogByDate(
    request: GetSleepByDateRequest,
    offsetFromUTCMillis: number,
    options: TokenRequestOptions,
  ): Promise<SleepResponse> {
    return SleepResponseFromJson(
      offsetFromUTCMillis,
      await this.getSleepLogByDateRaw(request, options),
    );
  }

  async getSleepLogByDateRaw(
    request: GetSleepByDateRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    const { localDate } = request;
    const path = `/1.2/user/-/sleep/date/${localDate}.json`;
    return this.get(path, options);
  }
}
