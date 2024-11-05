import { BaseApi, TokenRequestOptions } from './base.api';
import { ProfileResponse, ProfileResponseFromJson } from '../models/profile';

export class ProfileApi extends BaseApi {
  override scope = 'profile' as const;

  /**
   * プロフィール取得API
   * https://dev.fitbit.com/build/reference/web-api/user/get-profile/
   * @param options
   */
  async getProfile(options: TokenRequestOptions): Promise<ProfileResponse> {
    const response = await this.getProfileRaw(options);
    return ProfileResponseFromJson(response);
  }

  async getProfileRaw(options: TokenRequestOptions): Promise<unknown> {
    const path = `/1/user/-/profile.json`;
    return this.get(path, options);
  }
}
