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
    const { utcDate } = request;
    const path = `/1.2/user/-/sleep/date/${utcDate}.json`;
    const response = await this.get(path, options);
    return SleepResponseFromJson(response);
  }
}
