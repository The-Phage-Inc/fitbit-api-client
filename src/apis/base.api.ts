import { FITBIT_API_BASE_URL } from '../constants';
import { FitbitScope } from '../types';
import { ResponseError } from '../models';

interface RequestOptions extends RequestInit {
  accessToken?: string;
}

/**
 * アクセストークンを持つリクエストオプション
 */
export interface TokenRequestOptions extends RequestOptions {
  accessToken: string;
}

export abstract class BaseApi {
  /**
   * 必要なスコープ
   */
  abstract scope: FitbitScope | null;

  protected async fetchAPI(
    path: string,
    options: RequestOptions,
  ): Promise<unknown> {
    const { accessToken, headers = {}, ...fetchOptions } = options;
    const {
      Authorization,
      ['Content-Type']: contentType = 'application/json',
      ...fetchHeaders
    } = headers as {
      Authorization?: string;
      'Content-Type'?: string;
    } & HeadersInit;

    const response = await fetch(`${FITBIT_API_BASE_URL}${path}`, {
      ...fetchOptions,
      headers: {
        ...fetchHeaders,
        Authorization: Authorization ?? `Bearer ${accessToken}`,
        'Content-Type': contentType,
      },
    });

    if (response.ok) {
      return await response.json();
    }
    throw new ResponseError(
      response,
      `${response.status} ${response.statusText}`,
    );
  }

  protected async get(path: string, options: RequestOptions): Promise<unknown> {
    return this.fetchAPI(path, {
      method: 'GET',
      ...options,
    });
  }

  protected async post(
    path: string,
    body: BodyInit,
    options: RequestOptions,
  ): Promise<unknown> {
    return this.fetchAPI(path, {
      method: 'POST',
      body,
      ...options,
    });
  }
}
