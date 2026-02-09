"use client";

import { useState } from "react";

export function MessageComposer() {
  const [value, setValue] = useState("");

  return (
    <div className="px-4 pb-6 bg-[#313338]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setValue("");
        }}
        className="relative"
      >
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#383a40]">
          <button type="button" className="text-[#b5bac1] hover:text-[#dbdee1] transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </button>
          
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Message #general"
            className="flex-1 bg-transparent text-[#dbdee1] placeholder-[#6d6f78] outline-none"
          />
          
          <div className="flex items-center gap-2">
            <button type="button" className="text-[#b5bac1] hover:text-[#dbdee1] transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </button>
            <button type="button" className="text-[#b5bac1] hover:text-[#dbdee1] transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
