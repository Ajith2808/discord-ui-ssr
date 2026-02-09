import Link from "next/link";
import { Server } from "@/lib/types";

export function ServerRail({
  servers,
  activeServerId,
}: {
  servers: Server[];
  activeServerId: string;
}) {
  return (
    <aside className="w-[72px] bg-[#1e1f22] flex flex-col items-center py-3 gap-2">
      {/* Home Button */}
      <Link
        href="/servers/discord/channels/general"
        className="group relative w-12 h-12 rounded-[24px] hover:rounded-[16px] bg-[#313338] hover:bg-[#5865f2] transition-all duration-200 flex items-center justify-center"
      >
        <svg className="w-5 h-5 text-[#dbdee1]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      </Link>

      <div className="w-8 h-[2px] bg-[#35363c] rounded-full my-1" />

      {servers.map((server) => {
        const isActive = server.id === activeServerId;
        return (
          <Link
            key={server.id}
            href={`/servers/${server.id}/channels/general`}
            className="group relative"
          >
            {/* Active indicator */}
            <div
              className={`absolute left-0 w-1 bg-white rounded-r transition-all ${
                isActive ? "h-10" : "h-0 group-hover:h-5"
              }`}
              style={{ top: "50%", transform: "translateY(-50%)", marginLeft: "-4px" }}
            />
            
            <div
              className={`w-12 h-12 rounded-[24px] group-hover:rounded-[16px] transition-all duration-200 flex items-center justify-center text-lg font-semibold ${
                isActive
                  ? "bg-[#5865f2] text-white rounded-[16px]"
                  : "bg-[#313338] text-[#dbdee1] hover:bg-[#5865f2] hover:text-white"
              }`}
            >
              {server.iconText}
            </div>
            
            {/* Tooltip */}
            <div className="absolute left-[60px] top-1/2 -translate-y-1/2 px-3 py-2 bg-[#111214] text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
              {server.name}
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#111214]" />
            </div>
          </Link>
        );
      })}

      {/* Add Server Button */}
      <button className="group relative w-12 h-12 rounded-[24px] hover:rounded-[16px] bg-[#313338] hover:bg-[#23a559] transition-all duration-200 flex items-center justify-center text-[#23a559] hover:text-white">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z" />
        </svg>
      </button>
    </aside>
  );
}
