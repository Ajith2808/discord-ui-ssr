import { notFound } from "next/navigation";
import { getServer, getActivityMetrics } from "@/data/mock";

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;
  const server = getServer(serverId);
  if (!server) return notFound();

  const metrics = getActivityMetrics(serverId);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Insights</h1>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
            <div className="text-sm text-zinc-400 mb-1">Total Messages</div>
            <div className="text-3xl font-bold text-zinc-100">
              {metrics.reduce((sum, m) => sum + m.messages, 0)}
            </div>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
            <div className="text-sm text-zinc-400 mb-1">Avg Daily Messages</div>
            <div className="text-3xl font-bold text-zinc-100">
              {Math.round(metrics.reduce((sum, m) => sum + m.messages, 0) / metrics.length)}
            </div>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
            <div className="text-sm text-zinc-400 mb-1">Peak Active Users</div>
            <div className="text-3xl font-bold text-zinc-100">
              {Math.max(...metrics.map((m) => m.activeUsers))}
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">Activity Timeline</h2>
        <div className="space-y-2">
          {metrics.map((metric) => (
            <div key={metric.date} className="flex items-center gap-4 p-3 rounded-lg bg-zinc-900/30">
              <div className="text-sm text-zinc-400 w-24">
                {new Date(metric.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-blue-600"
                        style={{ width: `${(metric.messages / 70) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-zinc-300 w-20">{metric.messages} msgs</div>
                  <div className="text-sm text-zinc-400 w-20">{metric.activeUsers} users</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
