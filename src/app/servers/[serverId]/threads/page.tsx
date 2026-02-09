import { notFound } from "next/navigation";
import Link from "next/link";
import { getServer, getThreads } from "@/data/mock";

export default async function ThreadsPage({
  params,
}: {
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;
  const server = getServer(serverId);
  if (!server) return notFound();

  const threads = getThreads(serverId);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Threads</h1>
        <div className="space-y-3">
          {threads.map((thread) => (
            <Link
              key={thread.id}
              href={`/servers/${serverId}/threads/${thread.id}`}
              className="block p-4 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-100">{thread.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-zinc-400">
                    <span>Started by {thread.author.name}</span>
                    <span>•</span>
                    <span>{thread.replyCount} replies</span>
                  </div>
                </div>
                <time className="text-xs text-zinc-500">
                  {new Date(thread.createdAt).toLocaleDateString()}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
