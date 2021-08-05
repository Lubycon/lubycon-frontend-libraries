export interface IncomingWebhook {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  user_id: string;
  channel_id: string;
  team_id: string;
  display_name: string;
  description: string;
  username: string;
  icon_url: string;
  channel_locked: boolean;
}

interface MessageAttachmentAction {
  id: string;
  name: string;
  integration: {
    url: string;
    context?: {
      action: string;
    };
  };
}

interface MessageAttachmentFields {
  title: string;
  value: string;
  short?: boolean;
}

export interface MessageAttachment {
  pretext?: string;
  text?: string;
  actions?: MessageAttachmentAction[];
  color?: string;
  fallback: string;
  author_name?: string;
  author_link?: string;
  author_icon?: string;
  title?: string;
  title_link?: string;
  fields?: MessageAttachmentFields[];
  image_url?: string;
  thumb_url?: string;
}

export interface IncomingWebhookMessageParams {
  text?: string;
  channel?: string;
  username?: string;
  icon_url?: string;
  icon_emoji?: string;
  attachments?: MessageAttachment[];
  type?: string;
}
