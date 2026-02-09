import { notFound } from "next/navigation";
import { getServer } from "@/data/mock";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;
  const server = getServer(serverId);
  if (!server) return notFound();

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Server Settings</h1>
        
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
            <h2 className="font-semibold mb-3">Server Information</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-zinc-400">Server Name</label>
                <div className="mt-1 px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  {server.name}
                </div>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Server ID</label>
                <div className="mt-1 px-3 py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 font-mono text-sm">
                  {server.id}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
            <h2 className="font-semibold mb-3">Notifications</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-zinc-300">All messages</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-zinc-300">Only @mentions</span>
              </label>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
            <h2 className="font-semibold mb-2">Privacy</h2>
            <p className="text-sm text-zinc-400">
              This is a demo application with local mock data. No actual settings are persisted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
