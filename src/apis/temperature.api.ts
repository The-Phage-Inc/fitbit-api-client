import { BaseApi, TokenRequestOptions } from './base.api';
import { UtcDate } from '../types';

interface GetTemperatureByDateRequest {
  utcDate: UtcDate;
}

export class TemperatureApi extends BaseApi {
  override scope = 'temperature' as const;

  async getTemperatureCoreSummaryByDateRaw(
    request: GetTemperatureByDateRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    const { utcDate } = request;
    const path = `/1/user/-/temp/core/date/${utcDate}.json`;
    return this.get(path, options);
  }
}
