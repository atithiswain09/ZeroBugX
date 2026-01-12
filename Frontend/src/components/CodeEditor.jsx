import React, { useRef } from "react";

export default function CodeEditor({
  code = "",
  onCodeChange,
}) {
  const textareaRef = useRef(null);

  function handleTab(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = textareaRef.current;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const newValue = code.substring(0, start) + "  " + code.substring(end);
      onCodeChange(newValue);

      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2;
      });
    }
  }

  return (
    <div className="
      flex-1 
      min-h-[400px]
      lg:min-h-0
      flex 
      flex-col 
      bg-[#0B0F16] 
      text-white 
      rounded-2xl 
      p-5
      lg:p-6
      border 
      border-[#0F172A] 
      shadow-xl
      mb-4
      lg:mb-0
    ">
      
      {/* Header (Title + Copy Button) */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-[#22C55E]">
            ZeroBugX Code Editor
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Write or paste your code here
          </p>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            // Optional: Add toast notification here
          }}
          className="
            px-4 
            py-2 
            text-xs 
            font-semibold
            rounded-lg 
            bg-[#111827] 
            border 
            border-[#1F2937]
            text-[#22C55E] 
            hover:bg-[#1A2333] 
            hover:border-[#22C55E]
            hover:shadow-lg
            hover:shadow-[#22C55E]/20
            transition-all
            duration-200
            active:scale-95
          "
        >
           Copy
        </button>
      </div>

      {/* Textarea */}
      <div className="flex-1 min-h-0">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          onKeyDown={handleTab}
          placeholder=" Write your code here...

"
          className="
            w-full 
            h-full
            bg-[#0D1117] 
            text-[#22C55E] 
            font-mono 
            text-sm
            leading-relaxed
            p-5
            rounded-xl 
            border 
            border-[#1E293B]
            resize-none 
            outline-none 
            focus:border-[#22C55E] 
            focus:ring-2 
            focus:ring-[#22C55E]/40 
            transition-all
            duration-200
            placeholder:text-gray-700
            scrollbar-thin
            scrollbar-thumb-[#1E293B]
            scrollbar-track-[#0D1117]
          "
        />
      </div>
    </div>
  );
}