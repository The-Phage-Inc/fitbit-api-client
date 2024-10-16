import { BaseApi, TokenRequestOptions } from './base.api';
import { UtcDate } from '../types';
import { SleepResponse, SleepResponseFromJson } from '../models';

interface GetSleepByDateRequest {
  utcDate: UtcDate;
}

export class SleepApi extends BaseApi {
  override scope = 'sleep' as const;

  /**
   * 睡眠記録取得API
   * https://dev.fitbit.com/build/reference/web-api/sleep/get-sleep-log-by-date/
   */
  async getSleepLogByDate(
    request: GetSleepByDateRequest,
    options: TokenRequestOptions,
  ): Promise<SleepResponse> {
    return SleepResponseFromJson(
      await this.getSleepLogByDateRaw(request, options),
    );
  }

  async getSleepLogByDateRaw(
    request: GetSleepByDateRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    const { utcDate } = request;
    const path = `/1.2/user/-/sleep/date/${utcDate}.json`;
    return this.get(path, options);
  }
}
