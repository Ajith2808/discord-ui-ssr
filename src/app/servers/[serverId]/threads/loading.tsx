export default function Loading() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mx-auto max-w-4xl">
        <div className="h-8 w-32 bg-zinc-800 rounded mb-6 animate-pulse" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 animate-pulse">
              <div className="h-5 bg-zinc-800 rounded w-3/4 mb-2" />
              <div className="h-4 bg-zinc-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
