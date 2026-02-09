import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/Shell/AppShell";
import { ServerRail } from "@/components/Shell/ServerRail";
import { ChannelSidebar } from "@/components/Shell/ChannelSidebar";
import { TopTabs } from "@/components/Shell/TopTabs";
import { getChannels, getServer, getServers } from "@/data/mock";

export default async function ServerLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;

  const allServers = getServers();
  const server = getServer(serverId);
  if (!server) return notFound();

  const chans = getChannels(serverId);

  return (
    <AppShell
      rail={<ServerRail servers={allServers} activeServerId={serverId} />}
      sidebar={<ChannelSidebar server={server} channels={chans} />}
      top={<TopTabs serverId={serverId} />}
      content={children}
    />
  );
}
