export default function Loading() {
  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="mx-auto max-w-3xl space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="h-10 w-10 rounded-full bg-zinc-800" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-zinc-800 rounded w-32" />
              <div className="h-4 bg-zinc-800 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
