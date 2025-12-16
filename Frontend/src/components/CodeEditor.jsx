import React, { useRef } from "react";

export default function CodeEditor({
  code = "",
  onCodeChange,
  height = "500px",
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
    <div className="flex-1 flex flex-col bg-[#0B0F16] text-white rounded-2xl p-4 border border-[#0F172A] shadow-xl cursor-pointer">

      {/* Header (Title + Copy Button) */}
      <div className="flex items-center justify-between mb-3 cursor-pointer">
        <h3 className="text-base font-semibold text-[#22C55E] cursor-pointer">
          ZeroBugX Code Editor
        </h3>

        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="px-3 py-1 text-xs rounded bg-[#111827] border border-[#1F2937]
          text-[#22C55E] hover:bg-[#1A2333] hover:border-[#22C55E] transition cursor-pointer"
        >
          Copy
        </button>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        onKeyDown={handleTab}
        placeholder="Write your code here..."
        style={{ height }}
        className="w-full h-[80%] bg-[#0D1117] text-[#22C55E] font-mono text-sm p-4 rounded-xl border border-[#1E293B]
        resize-none outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/40 transition cursor-pointer"
      />
    </div>
  );
}
