import { BaseApi, TokenRequestOptions } from './base.api';
import { StepsResponse, StepsResponseFromJson } from '../models';
import { MinuteDetailLevel, UtcDate } from '../types';
import { CaloriesResponse, CaloriesResponseFromJson } from '../models';

interface GetActivityIntradayByDateRequest {
  utcDate: UtcDate;
  detailLevel: MinuteDetailLevel;
}

export class ActivityApi extends BaseApi {
  override scope = 'activity' as const;

  /**
   * 歩数記録取得API
   * @param request
   * @param options
   */
  async getStepsIntradayByDate(
    request: GetActivityIntradayByDateRequest,
    options: TokenRequestOptions,
  ): Promise<StepsResponse> {
    return StepsResponseFromJson(
      request.utcDate,
      await this.getStepsIntradayByDateRaw(request, options),
    );
  }

  async getStepsIntradayByDateRaw(
    request: GetActivityIntradayByDateRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    return this.getActivityIntradayByDate(
      { ...request, resource: 'steps' },
      options,
    );
  }

  /**
   * カロリー記録取得API
   * @param request
   * @param options
   */
  async getCaloriesIntradayByDate(
    request: GetActivityIntradayByDateRequest,
    options: TokenRequestOptions,
  ): Promise<CaloriesResponse> {
    return CaloriesResponseFromJson(
      request.utcDate,
      await this.getCaloriesIntradayByDateRaw(request, options),
    );
  }

  async getCaloriesIntradayByDateRaw(
    request: GetActivityIntradayByDateRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    return this.getActivityIntradayByDate(
      { ...request, resource: 'calories' },
      options,
    );
  }

  async getDistanceIntradayByDateRaw(
    request: GetActivityIntradayByDateRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    return this.getActivityIntradayByDate(
      { ...request, resource: 'distance' },
      options,
    );
  }

  async getElevationIntradayByDateRaw(
    request: GetActivityIntradayByDateRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    return this.getActivityIntradayByDate(
      { ...request, resource: 'elevation' },
      options,
    );
  }

  async getFloorsIntradayByDateRaw(
    request: GetActivityIntradayByDateRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    return this.getActivityIntradayByDate(
      { ...request, resource: 'floors' },
      options,
    );
  }

  async getSwimmingStrokesByDateRaw(
    request: GetActivityIntradayByDateRequest,
    options: TokenRequestOptions,
  ): Promise<unknown> {
    return this.getActivityIntradayByDate(
      { ...request, resource: 'swimming-strokes' },
      options,
    );
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
