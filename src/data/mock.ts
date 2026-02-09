import { Channel, Message, Server, User, Thread, ThreadReply, Attachment, ActivityMetric } from "@/lib/types";

const users: User[] = [
  { id: "u1", name: "Asha", avatarText: "A", status: "online", role: "Admin" },
  { id: "u2", name: "Ajith", avatarText: "AJ", status: "online", role: "Developer" },
  { id: "u3", name: "Maya", avatarText: "M", status: "away", role: "Product" },
  { id: "u4", name: "Ops", avatarText: "O", status: "online", role: "DevOps" },
  { id: "u5", name: "Monitor", avatarText: "M", status: "online", role: "Bot" },
  { id: "u6", name: "Lead", avatarText: "L", status: "offline", role: "Lead" },
];

export const servers: Server[] = [
  { id: "swa", name: "SAHM", iconText: "S" },
  { id: "discord", name: "discord", iconText: "B" },
  { id: "frontend", name: "Frontend Guild", iconText: "F" },
];

export const channels: Channel[] = [
  { id: "general", serverId: "discord", name: "general", kind: "text", unread: 3, isPinned: true },
  { id: "product", serverId: "discord", name: "product", kind: "text" },
  { id: "incidents", serverId: "discord", name: "incidents", kind: "text", unread: 1 },
  { id: "voice-lobby", serverId: "discord", name: "Voice Lobby", kind: "voice", activeUsers: 3 },
  { id: "team-standup", serverId: "discord", name: "Team Standup", kind: "voice", activeUsers: 0 },
  { id: "alerts", serverId: "swa", name: "alerts", kind: "text" },
  { id: "releases", serverId: "swa", name: "releases", kind: "text" },
  { id: "react", serverId: "frontend", name: "react", kind: "text" },
  { id: "architecture", serverId: "frontend", name: "architecture", kind: "text" },
];

const now = Date.now();
const iso = (minsAgo: number) => new Date(now - minsAgo * 60_000).toISOString();

export const messages: Message[] = [
  {
    id: "m1",
    serverId: "discord",
    channelId: "general",
    author: users[0],
    content: "Welcome! Post updates here. Keep it short and shippable.",
    createdAt: iso(120),
    reactions: [{ emoji: "👍", count: 3 }, { emoji: "🚀", count: 2 }],
    isPinned: true,
  },
  {
    id: "m2",
    serverId: "discord",
    channelId: "general",
    author: users[1],
    content: "Working on a Discord-style SSR UI demo in Next.js. No backend, clean routing.",
    createdAt: iso(98),
    isEdited: true,
  },
  {
    id: "m2b",
    serverId: "discord",
    channelId: "general",
    author: users[1],
    content: "Check out this architecture:",
    createdAt: iso(97),
    codeBlock: {
      language: "typescript",
      code: `export default async function Page({ params }) {
  const data = await fetchData();
  return <Content data={data} />;
}`,
    },
  },
  {
    id: "m2c",
    serverId: "discord",
    channelId: "general",
    author: users[2],
    content: "",
    createdAt: iso(95),
    embed: {
      title: "Next.js 15 Released",
      description: "Async Request APIs, improved caching, and more!",
      color: "#0070f3",
      url: "https://nextjs.org",
    },
  },
  {
    id: "m3",
    serverId: "discord",
    channelId: "product",
    author: users[2],
    content: "We should make channel switching feel instant. Skeleton + optimistic UI later.",
    createdAt: iso(80),
  },
  {
    id: "m4",
    serverId: "discord",
    channelId: "incidents",
    author: users[3],
    content: "Incident drill today. Validate routes, loading states, and error boundaries.",
    createdAt: iso(35),
  },
  {
    id: "m5",
    serverId: "swa",
    channelId: "alerts",
    author: users[4],
    content: "Alert: latency spike. Check client rendering and hydration costs.",
    createdAt: iso(15),
  },
  {
    id: "m6",
    serverId: "frontend",
    channelId: "architecture",
    author: users[5],
    content: "Nice: SSR shell + client-only composer. Keep boundaries explicit.",
    createdAt: iso(8),
  },
];

export const threads: Thread[] = [
  {
    id: "t1",
    serverId: "discord",
    title: "Q1 Planning Discussion",
    author: users[0],
    createdAt: iso(240),
    replyCount: 12,
  },
  {
    id: "t2",
    serverId: "discord",
    title: "Performance Optimization Ideas",
    author: users[1],
    createdAt: iso(180),
    replyCount: 8,
  },
  {
    id: "t3",
    serverId: "frontend",
    title: "React 19 Migration Plan",
    author: users[5],
    createdAt: iso(120),
    replyCount: 15,
  },
];

export const threadReplies: ThreadReply[] = [
  {
    id: "r1",
    threadId: "t1",
    author: users[1],
    content: "We should focus on SSR performance first.",
    createdAt: iso(230),
  },
  {
    id: "r2",
    threadId: "t1",
    author: users[2],
    content: "Agreed. Let's measure TTFB and hydration time.",
    createdAt: iso(220),
  },
  {
    id: "r3",
    threadId: "t2",
    author: users[0],
    content: "Consider lazy loading heavy components.",
    createdAt: iso(170),
  },
];

export const attachments: Attachment[] = [
  {
    id: "a1",
    serverId: "discord",
    name: "architecture-diagram.pdf",
    size: "2.4 MB",
    uploadedBy: users[1],
    uploadedAt: iso(300),
  },
  {
    id: "a2",
    serverId: "discord",
    name: "performance-report.xlsx",
    size: "1.1 MB",
    uploadedBy: users[2],
    uploadedAt: iso(200),
  },
  {
    id: "a3",
    serverId: "frontend",
    name: "component-library.zip",
    size: "5.8 MB",
    uploadedBy: users[5],
    uploadedAt: iso(150),
  },
];

export const activityMetrics: ActivityMetric[] = [
  { date: "2024-02-03", messages: 45, activeUsers: 8 },
  { date: "2024-02-04", messages: 52, activeUsers: 10 },
  { date: "2024-02-05", messages: 38, activeUsers: 7 },
  { date: "2024-02-06", messages: 61, activeUsers: 12 },
  { date: "2024-02-07", messages: 48, activeUsers: 9 },
  { date: "2024-02-08", messages: 55, activeUsers: 11 },
  { date: "2024-02-09", messages: 42, activeUsers: 8 },
];

export function getServers(): Server[] {
  return servers;
}

export function getServer(serverId: string): Server | undefined {
  return servers.find((s) => s.id === serverId);
}

export function getChannels(serverId: string): Channel[] {
  return channels.filter((c) => c.serverId === serverId);
}

export function getChannel(serverId: string, channelId: string): Channel | undefined {
  return channels.find((c) => c.serverId === serverId && c.id === channelId);
}

export function getMessages(serverId: string, channelId: string): Message[] {
  return messages
    .filter((m) => m.serverId === serverId && m.channelId === channelId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function getPinnedMessages(serverId: string, channelId: string): Message[] {
  return messages.filter(
    (m) => m.serverId === serverId && m.channelId === channelId && m.isPinned
  );
}

export function getUsers(serverId: string): User[] {
  return users;
}

export function getUser(userId: string): User | undefined {
  return users.find((u) => u.id === userId);
}

export function getThreads(serverId: string): Thread[] {
  return threads.filter((t) => t.serverId === serverId);
}

export function getThread(threadId: string): Thread | undefined {
  return threads.find((t) => t.id === threadId);
}

export function getThreadReplies(threadId: string): ThreadReply[] {
  return threadReplies
    .filter((r) => r.threadId === threadId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function getAttachments(serverId: string): Attachment[] {
  return attachments.filter((a) => a.serverId === serverId);
}

export function getActivityMetrics(serverId: string): ActivityMetric[] {
  return activityMetrics;
}
