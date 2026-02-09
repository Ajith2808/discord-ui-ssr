export default function Loading() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mx-auto max-w-4xl">
        <div className="h-8 w-32 bg-zinc-800 rounded mb-6 animate-pulse" />
        <div className="grid gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 animate-pulse">
              <div className="h-12 w-12 rounded-full bg-zinc-800" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-zinc-800 rounded w-32" />
                <div className="h-3 bg-zinc-800 rounded w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
