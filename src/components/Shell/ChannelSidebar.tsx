import Link from "next/link";
import { Channel, Server } from "@/lib/types";

export function ChannelSidebar({
  server,
  channels,
  activeChannelId,
}: {
  server: Server;
  channels: Channel[];
  activeChannelId?: string;
}) {
  const textChannels = channels.filter((c) => c.kind === "text");
  const voiceChannels = channels.filter((c) => c.kind === "voice");

  return (
    <aside className="w-60 bg-[#2b2d31] flex flex-col">
      {/* Server Header */}
      <div className="h-12 px-4 flex items-center shadow-md border-b border-[#1e1f22] hover:bg-[#35363c] cursor-pointer transition">
        <div className="flex-1 font-semibold text-white truncate">{server.name}</div>
        <svg className="w-4 h-4 text-[#b5bac1]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        </svg>
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto pt-4">
        {/* Text Channels */}
        <div className="px-2 mb-1">
          <div className="flex items-center px-2 mb-1 group cursor-pointer">
            <svg className="w-3 h-3 text-[#949ba4] mr-1 transition group-hover:text-[#dbdee1]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            </svg>
            <span className="text-xs font-semibold text-[#949ba4] uppercase tracking-wide group-hover:text-[#dbdee1] transition">
              Text Channels
            </span>
            <button className="ml-auto opacity-0 group-hover:opacity-100 transition">
              <svg className="w-4 h-4 text-[#b5bac1] hover:text-[#dbdee1]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z" />
              </svg>
            </button>
          </div>

          <nav className="space-y-0.5">
            {textChannels.map((c) => {
              const active = c.id === activeChannelId;
              return (
                <Link
                  key={c.id}
                  href={`/servers/${server.id}/channels/${c.id}`}
                  className={`group flex items-center gap-1.5 px-2 py-1.5 mx-2 rounded transition ${
                    active
                      ? "bg-[#404249] text-white"
                      : "text-[#949ba4] hover:bg-[#35363c] hover:text-[#dbdee1]"
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z" />
                  </svg>
                  <span className="flex-1 truncate font-medium">{c.name}</span>
                  {c.unread && c.unread > 0 && (
                    <div className="w-5 h-5 rounded-full bg-white text-[#313338] text-xs font-bold flex items-center justify-center">
                      {c.unread}
                    </div>
                  )}
                  {c.isPinned && (
                    <svg className="w-4 h-4 text-[#949ba4]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12l-9.899-9.899-1.415 1.413 1.415 1.415-4.95 4.95-5.657-1.414L0 10.05l7.778 7.778-6.364 6.364 1.414 1.414 6.364-6.364 7.778 7.778 1.414-1.414-1.414-5.657 4.95-4.95 1.415 1.415 1.413-1.415z" />
                    </svg>
                  )}
                  <div className="opacity-0 group-hover:opacity-100 transition">
                    <svg className="w-4 h-4 text-[#b5bac1] hover:text-[#dbdee1]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 16c.56 0 1.01.45 1.01 1.01 0 .56-.45 1.01-1.01 1.01-.56 0-1.01-.45-1.01-1.01 0-.56.45-1.01 1.01-1.01zm0-2c-.56 0-1.01-.45-1.01-1.01V7.01c0-.56.45-1.01 1.01-1.01.56 0 1.01.45 1.01 1.01v5.98c0 .56-.45 1.01-1.01 1.01z" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Voice Channels */}
        {voiceChannels.length > 0 && (
          <div className="px-2 mt-4 mb-1">
            <div className="flex items-center px-2 mb-1 group cursor-pointer">
              <svg className="w-3 h-3 text-[#949ba4] mr-1 transition group-hover:text-[#dbdee1]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
              </svg>
              <span className="text-xs font-semibold text-[#949ba4] uppercase tracking-wide group-hover:text-[#dbdee1] transition">
                Voice Channels
              </span>
            </div>

            <nav className="space-y-0.5">
              {voiceChannels.map((c) => (
                <div
                  key={c.id}
                  className="group flex items-center gap-1.5 px-2 py-1.5 mx-2 rounded text-[#949ba4] hover:bg-[#35363c] hover:text-[#dbdee1] cursor-pointer transition"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3a1 1 0 0 0-1 1v8a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1Z" />
                    <path d="M15 9a1 1 0 0 1 1 1 4 4 0 0 1-8 0 1 1 0 0 1 2 0 2 2 0 1 0 4 0 1 1 0 0 1 1-1Z" />
                    <path d="M13 16v3h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-3a7 7 0 0 1-7-7 1 1 0 0 1 2 0 5 5 0 0 0 10 0 1 1 0 1 1 2 0 7 7 0 0 1-5 6.71Z" />
                  </svg>
                  <span className="flex-1 truncate font-medium">{c.name}</span>
                  {c.activeUsers && c.activeUsers > 0 && (
                    <div className="flex items-center gap-1 text-xs text-[#949ba4]">
                      <div className="w-2 h-2 rounded-full bg-[#23a559]" />
                      {c.activeUsers}
                    </div>
                  )}
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.178 2.822a.75.75 0 0 1 0 1.06l-17.5 17.5a.75.75 0 0 1-1.06-1.06l17.5-17.5a.75.75 0 0 1 1.06 0Z" />
                  </svg>
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* User Panel */}
      <div className="h-[52px] bg-[#232428] px-2 flex items-center gap-2">
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5865f2] to-[#7289da] flex items-center justify-center text-sm font-semibold">
            U
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#23a559] border-2 border-[#232428] rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white truncate">Username</div>
          <div className="text-xs text-[#949ba4] truncate">online</div>
        </div>
        <button className="p-1 hover:bg-[#35363c] rounded transition">
          <svg className="w-5 h-5 text-[#b5bac1] hover:text-[#dbdee1]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
            <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z" />
          </svg>
        </button>
        <button className="p-1 hover:bg-[#35363c] rounded transition">
          <svg className="w-5 h-5 text-[#b5bac1] hover:text-[#dbdee1]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
