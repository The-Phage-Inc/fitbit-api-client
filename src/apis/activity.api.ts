import { BaseApi, TokenRequestOptions } from './base.api';
import { StepsResponse, StepsResponseFromJson } from '../models';
import { MinuteDetailLevel, UtcDate } from '../types';
import {
  CaloriesResponse,
  CaloriesResponseFromJson,
} from '../models/activities/calories';

interface GetActivityIntradayByDateRequest {
  utcDate: UtcDate;
  detailLevel: MinuteDetailLevel;
}

export class ActivityApi extends BaseApi {
  override scope = 'activity' as const;

  /**
   * 歩数記録取得API
   * https://dev.fitbit.com/build/reference/web-api/intraday/get-activity-intraday-by-date/
   * @param request
   * @param options
   */
  async getStepsIntradayByDate(
    request: GetActivityIntradayByDateRequest,
    options: TokenRequestOptions,
  ): Promise<StepsResponse> {
    const response = await this.getActivityIntradayByDate(
      { ...request, resource: 'steps' },
      options,
    );
    return StepsResponseFromJson(request.utcDate, response);
  }

  async getCaloriesIntradayByDate(
    request: GetActivityIntradayByDateRequest,
    options: TokenRequestOptions,
  ): Promise<CaloriesResponse> {
    const response = await this.getActivityIntradayByDate(
      { ...request, resource: 'calories' },
      options,
    );
    return CaloriesResponseFromJson(request.utcDate, response);
  }

  /**
   * ActivityAPI
   * https://dev.fitbit.com/build/reference/web-api/intraday/get-heartrate-intraday-by-date/
   * @param request
   * @param options
   */
  private async getActivityIntradayByDate(
    request: GetActivityIntradayByDateRequest & {
      resource:
        | 'calories'
        | 'distance'
        | 'elevation'
        | 'floors'
        | 'steps'
        | 'swimming-strokes';
    },
    options: TokenRequestOptions,
  ): Promise<unknown> {
    const { resource, utcDate, detailLevel } = request;
    const path = `/1/user/-/activities/${resource}/date/${utcDate}/1d/${detailLevel}.json?timezone=UTC`;
    return this.get(path, options);
  }
}
