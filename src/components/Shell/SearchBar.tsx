"use client";

import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="w-full h-6 px-2 text-sm rounded bg-[#1e1f22] text-[#dbdee1] placeholder-[#949ba4] outline-none focus:outline-none"
      />
      <svg
        className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[#949ba4] pointer-events-none"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M21.707 20.293l-5.395-5.396A7.946 7.946 0 0018 10a8 8 0 10-8 8 7.946 7.946 0 004.897-1.688l5.396 5.395a.999.999 0 101.414-1.414zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" />
      </svg>
    </div>
  );
}
