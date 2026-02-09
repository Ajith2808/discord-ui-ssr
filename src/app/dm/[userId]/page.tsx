import { notFound } from "next/navigation";
import { getUser } from "@/data/mock";

export default async function DMPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = getUser(userId);
  if (!user) return notFound();

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100">
      <div className="border-b border-zinc-800 bg-zinc-950/20 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-zinc-800 grid place-items-center text-sm font-semibold">
            {user.avatarText}
          </div>
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-xs text-zinc-500 capitalize">{user.status}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-3xl">
          <div className="text-center py-12">
            <div className="h-20 w-20 rounded-full bg-zinc-800 grid place-items-center text-3xl font-semibold mx-auto mb-4">
              {user.avatarText}
            </div>
            <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
            <p className="text-zinc-400">
              This is the beginning of your direct message history with {user.name}.
            </p>
          </div>
          <div className="text-sm text-zinc-500 text-center mt-8">
            DM feature is UI-only. No messages stored in mock data.
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 bg-zinc-950/40 p-3">
        <div className="mx-auto max-w-3xl">
          <input
            placeholder={`Message ${user.name}`}
            className="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none ring-1 ring-zinc-800 focus:ring-zinc-600"
          />
        </div>
      </div>
    </div>
  );
}
