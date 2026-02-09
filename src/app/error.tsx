'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center h-screen bg-[#313338]">
      <div className="max-w-md p-8 rounded-lg bg-[#2b2d31] border border-[#1e1f22]">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-[#949ba4]">
            An error occurred while loading this page.
          </p>
        </div>
        
        {error.digest && (
          <div className="mb-4 p-3 rounded bg-[#1e1f22] border border-[#111214]">
            <p className="text-xs text-[#72767d] font-mono">
              Error ID: {error.digest}
            </p>
          </div>
        )}
        
        <button
          onClick={reset}
          className="w-full px-4 py-2 rounded bg-[#5865f2] hover:bg-[#4752c4] text-white font-medium transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
