import { ReactNode } from "react";

export function AppShell({
  rail,
  sidebar,
  top,
  content,
}: {
  rail: ReactNode;
  sidebar: ReactNode;
  top: ReactNode;
  content: ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#313338] text-[#dbdee1]">
      {rail}
      {sidebar}
      <div className="flex flex-col flex-1">
        {top}
        {content}
      </div>
    </div>
  );
}
