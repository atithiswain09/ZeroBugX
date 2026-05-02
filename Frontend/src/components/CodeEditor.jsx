import { useRef, useState, useEffect } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import toast from "react-hot-toast";

export default function CodeEditor({ code = "", onCodeChange }) {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy.");
    }
  };

  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  const lines = code ? code.split("\n") : [""];
  const lineCount = lines.length;

  return (
    <div
      className="flex-1 min-h-[300px] sm:min-h-[400px] lg:min-h-0 flex flex-col glass text-white rounded-2xl border border-[var(--color-border-subtle)] overflow-hidden relative group/editor"
      style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
      
      {/* Editor Header - Mac Style */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[var(--color-border-subtle)] bg-[#0f141e]/80 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 opacity-80 group-hover/editor:opacity-100 transition-opacity">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] shadow-sm" />
          </div>
          <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-md border border-[var(--color-border-subtle)]">
            <Terminal size={12} className="text-[var(--color-accent)]" />
            <span className="text-xs font-mono text-[var(--color-text-secondary)]">main.jsx</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {code && (
            <button
              onClick={() => onCodeChange("")}
              className="px-3 py-1.5 text-[11px] font-medium rounded-lg bg-white/5 border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:bg-white/10 hover:text-[var(--color-text-secondary)] transition-all duration-200 cursor-pointer shadow-sm"
            >
              Clear
            </button>
          )}
          <button
            onClick={handleCopy}
            disabled={!code}
            className="px-3 py-1.5 text-[11px] font-semibold rounded-lg bg-gradient-to-r from-[var(--color-accent)]/10 to-[var(--color-accent)]/5 border border-[var(--color-accent)]/20 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={12} />
                Copied
              </>
            ) : (
              <>
                <Copy size={12} />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Body with Gutter */}
      <div className="flex-1 min-h-0 relative z-10 flex bg-[#0b0f17] group-focus-within/editor:bg-[#0d131c] transition-colors duration-300">
        
        {/* Line Numbers */}
        <div 
          ref={lineNumbersRef}
          className="w-12 sm:w-14 flex-shrink-0 bg-[#06080d]/50 border-r border-[var(--color-border-subtle)] py-4 sm:py-5 flex flex-col items-end pr-3 select-none overflow-hidden text-right font-mono text-[13px] leading-[1.6] text-[var(--color-text-disabled)]/70 shadow-[inset_-1px_0_0_rgba(255,255,255,0.02)]"
        >
          {lines.map((_, i) => (
            <div key={i} className={i === lines.length - 1 && lines[i] === "" ? "opacity-30" : ""}>{i + 1}</div>
          ))}
        </div>

        {/* Textarea */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            onKeyDown={handleTab}
            onScroll={handleScroll}
            placeholder="// Paste or write your code here..."
            spellCheck={false}
            className="absolute inset-0 w-full h-full bg-transparent text-[#e2e8f0] font-mono text-[13px] leading-[1.6] p-4 sm:p-5 resize-none outline-none transition-all duration-200 placeholder:text-[var(--color-text-disabled)]/50 custom-scrollbar whitespace-pre overflow-auto"
            style={{ 
              tabSize: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
}