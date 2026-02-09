"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBar } from "./SearchBar";

export function TopTabs({ serverId }: { serverId: string }) {
  const pathname = usePathname();

  const tabs = [
    { label: "Channels", href: `/servers/${serverId}/channels/general` },
    { label: "Threads", href: `/servers/${serverId}/threads` },
    { label: "Members", href: `/servers/${serverId}/members` },
    { label: "Files", href: `/servers/${serverId}/files` },
    { label: "Insights", href: `/servers/${serverId}/insights` },
    { label: "Settings", href: `/servers/${serverId}/settings` },
  ];

  return (
    <div className="h-12 flex items-center gap-4 px-4 border-b border-[#1e1f22] bg-[#313338] shadow-sm">
      {tabs.map((t) => {
        const active = pathname?.startsWith(
          t.href.replace("/general", "/channels")
        );

        return (
          <Link
            key={t.href}
            href={t.href}
            className={`px-2 py-1 text-sm font-medium rounded transition ${
              active
                ? "text-white"
                : "text-[#949ba4] hover:text-[#dbdee1]"
            }`}
          >
            {t.label}
          </Link>
        );
      })}

      <div className="ml-auto flex items-center gap-3">
        <div className="w-56">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
