export type Server = {
  id: string;
  name: string;
  iconText: string;
};

export type Channel = {
  id: string;
  serverId: string;
  name: string;
  kind: "text" | "voice";
  unread?: number;
  isPinned?: boolean;
  activeUsers?: number;
};

export type User = {
  id: string;
  name: string;
  avatarText: string;
  status: "online" | "away" | "offline";
  role?: string;
};

export type Message = {
  id: string;
  serverId: string;
  channelId: string;
  author: User;
  content: string;
  createdAt: string;
  reactions?: { emoji: string; count: number }[];
  isPinned?: boolean;
  isEdited?: boolean;
  embed?: {
    title?: string;
    description?: string;
    color?: string;
    url?: string;
  };
  codeBlock?: {
    language: string;
    code: string;
  };
};

export type Thread = {
  id: string;
  serverId: string;
  title: string;
  author: User;
  createdAt: string;
  replyCount: number;
};

export type ThreadReply = {
  id: string;
  threadId: string;
  author: User;
  content: string;
  createdAt: string;
};

export type Attachment = {
  id: string;
  serverId: string;
  name: string;
  size: string;
  uploadedBy: User;
  uploadedAt: string;
};

export type ActivityMetric = {
  date: string;
  messages: number;
  activeUsers: number;
};
  