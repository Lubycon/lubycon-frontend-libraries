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
  }

  private getAutorizationHeader() {
    return {
      headers: {
        Authorization: this.personalAccessToken ? `Bearer ${this.personalAccessToken}` : '',
      },
    };
  }

  setPersonalAccessToken(personalAccessToken: string) {
    this.personalAccessToken = personalAccessToken;
  }

  async login({ email, password }: { email: string; password: string }) {
    const response = await this.http.rawPost<UserProfile>('/api/v4/users/login', {
      login_id: email,
      password,
    });
    const token: string = response.headers['token'];
    return token;
  }

  logout() {
    return this.http.post<StatusResponse>('/api/v4/users/logout');
  }

  createUser(user: CreateUserProfile) {
    return this.http.post<UserProfile>('/api/v4/users/', user, this.getAutorizationHeader());
  }

  fetchAllUsers(queries: QueryParams) {
    return this.http.get<UserProfile[]>('/api/v4/users', {
      params: queries,
      ...this.getAutorizationHeader(),
    });
  }

  fetchUser(userId: string) {
    return this.http.get<UserProfile>(`/api/v4/users/${userId}`, this.getAutorizationHeader());
  }

  patchUser(userId: string, user: Partial<UserProfile>) {
    return this.http.put<UserProfile>(
      `/api/v4/users/${userId}/patch`,
      user,
      this.getAutorizationHeader()
    );
  }

  updateUserRole(userId: string, roles: UserRole[]) {
    return this.http.put<StatusResponse>(
      `/api/v4/users/${userId}/roles`,
      {
        roles: roles.join(' '),
      },
      this.getAutorizationHeader()
    );
  }

  updateUserActiveStatus(userId: string, active: boolean) {
    return this.http.put<StatusResponse>(
      `/api/v4/users/${userId}/active`,
      {
        active,
      },
      this.getAutorizationHeader()
    );
  }

  sendPasswordResetEmail(email: string) {
    return this.http.post<StatusResponse>(
      '/api/v4/users/password/reset/send',
      {
        email,
      },
      this.getAutorizationHeader()
    );
  }

  fetchAllChannels(queries: QueryParams) {
    return this.http.get<ChannelWithTeamData>('/api/v4/channels', {
      params: queries,
      ...this.getAutorizationHeader(),
    });
  }

  fetchChannelMembers(channelId: string) {
    return this.http.get<ChannelMembership[]>(
      `/api/v4/channels/${channelId}/members`,
      this.getAutorizationHeader()
    );
  }

  addUserToChannel({ channelId, userId }: { channelId: string; userId: string }) {
    return this.http.post(
      `/api/v4/channels/${channelId}/members`,
      {
        user_id: userId,
      },
      this.getAutorizationHeader()
    );
  }

  removeUserFromChannel({ channelId, userId }: { channelId: string; userId: string }) {
    return this.http.delete(
      `/api/v4/channels/${channelId}/members/${userId}`,
      this.getAutorizationHeader()
    );
  }

  createIncomingWebhooks(params: {
    channelId: string;
    userId: string;
    displayName: string;
    description: string;
    userName: string;
    iconUrl: string;
  }) {
    return this.http.post<IncomingWebhook>(
      '/api/v4/hooks/incoming',
      params,
      this.getAutorizationHeader()
    );
  }

  fetchAllIncomingWebhooks(queries: QueryParams) {
    return this.http.get<IncomingWebhook[]>('/api/v4/hooks/incoming', {
      params: queries,
      ...this.getAutorizationHeader(),
    });
  }

  fetchIncomingWebhook(hookId: string) {
    return this.http.get<IncomingWebhook>(
      `/api/v4/hooks/incoming/${hookId}`,
      this.getAutorizationHeader()
    );
  }

  postMessageToIncomingWebhook(webhookUrl: string, args: IncomingWebhookMessageParams) {
    return this.http.post(webhookUrl, args, this.getAutorizationHeader());
  }

  checkSystemHealth() {
    return this.http.get<SystemStatus>('/api/v4/system/ping', this.getAutorizationHeader());
  }
}
