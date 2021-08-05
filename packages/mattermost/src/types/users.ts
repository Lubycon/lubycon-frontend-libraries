export interface UserNotifyProps {
  desktop: 'default' | 'all' | 'mention' | 'none';
  desktop_sound: 'true' | 'false';
  email: 'true' | 'false';
  mark_unread: 'all' | 'mention';
  push: 'default' | 'all' | 'mention' | 'none';
  push_status: 'ooo' | 'offline' | 'away' | 'dnd' | 'online';
  comments: 'never' | 'root' | 'any';
  first_name: 'true' | 'false';
  channel: 'true' | 'false';
  mention_keys: string;
}

export interface UserTimezone {
  useAutomaticTimezone: boolean | string;
  automaticTimezone: string;
  manualTimezone: string;
}

export interface CreateUserProfile {
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  nickname: string;
  position: string;
  locale: string;
}

export interface UserProfile {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  username: string;
  password: string;
  auth_data: string;
  auth_service: string;
  email: string;
  email_verified: boolean;
  nickname: string;
  first_name: string;
  last_name: string;
  position: string;
  roles: string;
  allow_marketing: boolean;
  props: Record<string, string>;
  notify_props: UserNotifyProps;
  last_password_update: number;
  last_picture_update: number;
  failed_attempts: number;
  locale: string;
  timezone?: UserTimezone;
  mfa_active: boolean;
  mfa_secret: string;
  last_activity_at: number;
  is_bot: boolean;
  bot_description: string;
  bot_last_icon_update: number;
  terms_of_service_id: string;
  terms_of_service_create_at: number;
}

export type UserRole = 'system_user' | 'system_admin';
