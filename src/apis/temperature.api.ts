import { BaseApi, TokenRequestOptions } from './base.api';

interface GetTemperatureByDateRequest {
  localDate: string;
}

export class TemperatureApi extends BaseApi {
  override scope = 'temperature' as const;

  async getTemperatureCoreSummaryByDateRaw(
    request: GetTemperatureByDateRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    const { localDate } = request;
    const path = `/1/user/-/temp/core/date/${localDate}.json`;
    return this.get(path, options);
  }
}
