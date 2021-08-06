import { ChannelMembership, ChannelWithTeamData } from '../types/channels';
import { QueryParams } from '../types/query';
import { StatusResponse } from '../types/response';
import { SystemStatus } from '../types/system';
import { CreateUserProfile, UserProfile, UserRole } from '../types/users';
import { IncomingWebhook, IncomingWebhookMessageParams } from '../types/webhooks';
import client from '../utils/http';

export class MattermostClient {
  private personalAccessToken: string;
  private http = client;

  constructor(personalAccessToken?: string) {
    this.personalAccessToken = personalAccessToken ?? '';
    this.http.instance.interceptors.request.use((config) => {
      return {
        ...config,
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.personalAccessToken ? `Bearer ${this.personalAccessToken}` : null,
          ...config.headers,
        },
      };
    });
  }

  setPersonalAccessToken(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
  }

  async login({ email, password }: { email: string; password: string }) {
    const response = await this.http.rawPost<UserProfile>('/api/v4/users/login', {
      login_id: email,
      password,
    });
    const token: string = response.headers['Token'];
    return token;
  }

  logout() {
    return this.http.post<StatusResponse>('/api/v4/users/logout');
  }

  createUser(user: CreateUserProfile) {
    return this.http.post<UserProfile>('/api/v4/users/', user);
  }

  fetchAllUsers(queries: QueryParams) {
    return this.http.get<UserProfile[]>('/api/v4/users', {
      params: queries,
    });
  }

  fetchUser(userId: string) {
    return this.http.get<UserProfile>(`/api/v4/users/${userId}`);
  }

  patchUser(userId: string, user: Partial<UserProfile>) {
    return this.http.put<UserProfile>(`/api/v4/users/${userId}/patch`, user);
  }

  updateUserRole(userId: string, roles: UserRole[]) {
    return this.http.put<StatusResponse>(`/api/v4/users/${userId}/roles`, {
      roles: roles.join(' '),
    });
  }

  updateUserActiveStatus(userId: string, active: boolean) {
    return this.http.put<StatusResponse>(`/api/v4/users/${userId}/active`, {
      active,
    });
  }

  sendPasswordResetEmail(email: string) {
    return this.http.post<StatusResponse>('/api/v4/users/password/reset/send', {
      email,
    });
  }

  fetchAllChannels(queries: QueryParams) {
    return this.http.get<ChannelWithTeamData>('/api/v4/channels', {
      params: queries,
    });
  }

  fetchChannelMembers(channelId: string) {
    return this.http.get<ChannelMembership[]>(`/api/v4/channels/${channelId}/members`);
  }

  addUserToChannel({ channelId, userId }: { channelId: string; userId: string }) {
    return this.http.post(`/api/v4/channels/${channelId}/members`, {
      user_id: userId,
    });
  }

  removeUserFromChannel({ channelId, userId }: { channelId: string; userId: string }) {
    return this.http.delete(`/api/v4/channels/${channelId}/members/${userId}`);
  }

  createIncomingWebhooks(params: {
    channelId: string;
    userId: string;
    displayName: string;
    description: string;
    userName: string;
    iconUrl: string;
  }) {
    return this.http.post<IncomingWebhook>('/api/v4/hooks/incoming', params);
  }

  fetchAllIncomingWebhooks(queries: QueryParams) {
    return this.http.get<IncomingWebhook[]>('/api/v4/hooks/incoming', {
      params: queries,
    });
  }

  fetchIncomingWebhook(hookId: string) {
    return this.http.get<IncomingWebhook>(`/api/v4/hooks/incoming/${hookId}`);
  }

  postMessageToIncomingWebhook(webhookUrl: string, args: IncomingWebhookMessageParams) {
    return this.http.post(webhookUrl, args);
  }

  checkSystemHealth() {
    return this.http.get<SystemStatus>('/api/v4/system/ping');
  }
}
