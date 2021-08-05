/**
 * O: Public, P: Private, D: Direct Message, G: Group
 */
export type ChannelType = 'O' | 'P' | 'D' | 'G';

export interface ChannelNotifyProps {
  desktop: 'default' | 'all' | 'mention' | 'none';
  email: 'default' | 'all' | 'mention' | 'none';
  mark_unread: 'all' | 'mention';
  push: 'default' | 'all' | 'mention' | 'none';
  ignore_channel_mentions: 'default' | 'off' | 'on';
}

export interface Channel {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  team_id: string;
  type: ChannelType;
  display_name: string;
  name: string;
  header: string;
  purpose: string;
  last_post_at: number;
  total_msg_count: number;
  extra_update_at: number;
  creator_id: string;
  scheme_id: string;
  isCurrent?: boolean;
  teammate_id?: string;
  status?: string;
  fake?: boolean;
  group_constrained: boolean;
  props?: Record<string, any>;
}

export interface ChannelWithTeamData extends Channel {
  team_display_name: string;
  team_name: string;
  team_update_at: number;
}

export interface ChannelMembership {
  channel_id: string;
  user_id: string;
  roles: string;
  last_viewed_at: number;
  msg_count: number;
  mention_count: number;
  notify_props: Partial<ChannelNotifyProps>;
  last_update_at: number;
  scheme_user: boolean;
  scheme_admin: boolean;
  post_root_id?: string;
}
