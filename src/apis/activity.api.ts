import { BaseApi, TokenRequestOptions } from './base.api';
import { StepsResponse, StepsResponseFromJson } from '../models';
import { MinuteDetailLevel } from '../types';
import { CaloriesResponse, CaloriesResponseFromJson } from '../models';
import { validateDateString } from '../utils/date.utils';

interface GetActivityIntradayByDateRequest {
  /**
   * 端末のタイムゾーンでの日付
   * 'YYYY-MM-DD'
   */
  localDate: string;
  detailLevel: MinuteDetailLevel;
}

export class ActivityApi extends BaseApi {
  override scope = 'activity' as const;

  /**
   * 歩数記録取得API
   * @param request
   * @param offsetFromUTCMillis
   * @param options
   */
  async getStepsIntradayByDate(
    request: GetActivityIntradayByDateRequest,
    offsetFromUTCMillis: number,
    options: TokenRequestOptions,
  ): Promise<StepsResponse> {
    return StepsResponseFromJson(
      request.localDate,
      offsetFromUTCMillis,
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
   * @param offsetFromUTCMillis
   * @param options
   */
  async getCaloriesIntradayByDate(
    request: GetActivityIntradayByDateRequest,
    offsetFromUTCMillis: number,
    options: TokenRequestOptions,
  ): Promise<CaloriesResponse> {
    return CaloriesResponseFromJson(
      request.localDate,
      offsetFromUTCMillis,
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
    const { resource, localDate, detailLevel } = request;
    validateDateString(localDate);
    const path = `/1/user/-/activities/${resource}/date/${localDate}/1d/${detailLevel}.json`;
    return this.get(path, options);
  }
}
