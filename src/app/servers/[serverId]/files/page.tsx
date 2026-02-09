import { notFound } from "next/navigation";
import { getServer, getAttachments } from "@/data/mock";

export default async function FilesPage({
  params,
}: {
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;
  const server = getServer(serverId);
  if (!server) return notFound();

  const attachments = getAttachments(serverId);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Files</h1>
        <div className="space-y-3">
          {attachments.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 transition"
            >
              <div className="h-12 w-12 rounded bg-zinc-800 grid place-items-center">
                <svg className="h-6 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-zinc-100 truncate">{file.name}</div>
                <div className="flex items-center gap-3 mt-1 text-sm text-zinc-400">
                  <span>{file.size}</span>
                  <span>•</span>
                  <span>Uploaded by {file.uploadedBy.name}</span>
                  <span>•</span>
                  <time>{new Date(file.uploadedAt).toLocaleDateString()}</time>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
