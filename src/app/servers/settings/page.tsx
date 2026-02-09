import { getServer } from "@/data/mock";
import { notFound } from "next/navigation";

export default function SettingsPage({ params }: { params: { serverId: string } }) {
  const s = getServer(params.serverId);
  if (!s) return notFound();

  return (
    <div className="p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-lg font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-zinc-400">
          UI-only page. Good place to show component patterns and forms.
        </p>

        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/30 p-4">
            <div className="text-sm font-semibold">Server Name</div>
            <div className="mt-2 text-sm text-zinc-300">{s.name}</div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/30 p-4">
            <div className="text-sm font-semibold">Theme</div>
            <div className="mt-2 text-sm text-zinc-300">Dark (static)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
