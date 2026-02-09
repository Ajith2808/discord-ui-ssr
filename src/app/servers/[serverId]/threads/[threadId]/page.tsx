import { notFound } from "next/navigation";
import { getThread, getThreadReplies } from "@/data/mock";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ serverId: string; threadId: string }>;
}) {
  const { threadId } = await params;
  const thread = getThread(threadId);
  if (!thread) return notFound();

  const replies = getThreadReplies(threadId);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 pb-6 border-b border-zinc-800">
          <h1 className="text-2xl font-bold mb-2">{thread.title}</h1>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <div className="h-8 w-8 rounded-full bg-zinc-800 grid place-items-center text-xs font-semibold">
              {thread.author.avatarText}
            </div>
            <span>{thread.author.name}</span>
            <span>•</span>
            <time>{new Date(thread.createdAt).toLocaleDateString()}</time>
          </div>
        </div>

        <div className="space-y-4">
          {replies.map((reply) => (
            <div key={reply.id} className="flex gap-3 p-4 rounded-lg bg-zinc-900/30">
              <div className="h-10 w-10 rounded-full bg-zinc-800 grid place-items-center text-sm font-semibold">
                {reply.author.avatarText}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-zinc-100">{reply.author.name}</span>
                  <time className="text-xs text-zinc-500">
                    {new Date(reply.createdAt).toLocaleTimeString()}
                  </time>
                </div>
                <p className="text-zinc-200">{reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
