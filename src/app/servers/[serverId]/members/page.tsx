import { notFound } from "next/navigation";
import { getServer, getUsers } from "@/data/mock";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;
  const server = getServer(serverId);
  if (!server) return notFound();

  const users = getUsers(serverId);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Members</h1>
        <div className="grid gap-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800"
            >
              <div className="h-12 w-12 rounded-full bg-zinc-800 grid place-items-center text-lg font-semibold">
                {user.avatarText}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-100">{user.name}</span>
                  {user.role && (
                    <span className="px-2 py-0.5 text-xs rounded bg-blue-900/50 text-blue-300 border border-blue-800">
                      {user.role}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      user.status === "online"
                        ? "bg-green-500"
                        : user.status === "away"
                        ? "bg-yellow-500"
                        : "bg-zinc-600"
                    }`}
                  />
                  <span className="text-sm text-zinc-400 capitalize">{user.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
