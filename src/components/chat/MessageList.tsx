import { Message } from "@/lib/types";

export function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#313338]">
      <div className="px-4 py-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="flex gap-4 px-2 py-2.5 hover:bg-[#2e3035] rounded transition">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5865f2] to-[#7289da] flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              {m.author.avatarText}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="font-medium text-[#f2f3f5] hover:underline cursor-pointer text-[15px]">
                  {m.author.name}
                </span>
                {m.author.role && (
                  <span className="px-1 py-0.5 text-[10px] font-medium rounded bg-[#5865f2] text-white uppercase">
                    {m.author.role}
                  </span>
                )}
                <time className="text-xs text-[#949ba4] font-medium">{formatTime(m.createdAt)}</time>
                {m.isEdited && <span className="text-[10px] text-[#72767d]">(edited)</span>}
              </div>
              
              {m.content && (
                <p className="text-[#dcddde] text-[15px] leading-[1.375rem] break-words">{m.content}</p>
              )}
              
              {/* Code Block */}
              {m.codeBlock && (
                <div className="mt-1 rounded-md bg-[#2b2d31] border border-[#1e1f22] overflow-hidden max-w-2xl">
                  <div className="flex items-center justify-between px-3 py-2 bg-[#1e1f22]">
                    <span className="text-xs text-[#b5bac1] font-mono">{m.codeBlock.language}</span>
                    <button className="text-xs text-[#b5bac1] hover:text-[#dbdee1] transition px-2 py-1 rounded hover:bg-[#2b2d31]">
                      Copy
                    </button>
                  </div>
                  <pre className="p-3 text-sm overflow-x-auto">
                    <code className="text-[#23a559] font-mono leading-relaxed">{m.codeBlock.code}</code>
                  </pre>
                </div>
              )}
              
              {/* Embed */}
              {m.embed && (
                <div className="mt-1 rounded-md bg-[#2b2d31] border-l-4 border-[#5865f2] overflow-hidden max-w-lg">
                  <div className="p-3">
                    {m.embed.title && (
                      <div className="font-semibold text-[#00a8fc] mb-1 hover:underline cursor-pointer text-sm">
                        {m.embed.title}
                      </div>
                    )}
                    {m.embed.description && (
                      <p className="text-sm text-[#dcddde] leading-relaxed">{m.embed.description}</p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Reactions */}
              {m.reactions && m.reactions.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {m.reactions.map((reaction, idx) => (
                    <button
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-[#2b2d31] hover:bg-[#35363c] border border-[#1e1f22] hover:border-[#949ba4] transition flex items-center gap-1"
                    >
                      <span className="text-base leading-none">{reaction.emoji}</span>
                      <span className="text-xs text-[#b5bac1] font-medium">{reaction.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">💬</div>
            <div className="text-[#949ba4]">
              No messages yet. Start the conversation!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  
  if (isToday) {
    return d.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  }
  
  return d.toLocaleDateString(undefined, {
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
  });
}
