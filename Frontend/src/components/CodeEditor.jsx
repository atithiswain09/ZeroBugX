import { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function CodeEditor({ code = "", onCodeChange }) {
  const textareaRef = useRef(null);
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

  const lineCount = code ? code.split("\n").length : 0;

  return (
    <div
      className="flex-1 min-h-[300px] sm:min-h-[400px] lg:min-h-0 flex flex-col bg-[var(--color-bg-elevated)] text-white rounded-xl p-4 sm:p-5 lg:p-6 border border-[var(--color-border-subtle)] mb-3 sm:mb-4 lg:mb-0"
      style={{ boxShadow: "var(--shadow-lg)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[var(--color-accent)]">
            Code Editor
          </h3>
          <p className="text-[11px] text-[var(--color-text-disabled)] mt-0.5">
            {lineCount > 0
              ? `${lineCount} line${lineCount !== 1 ? "s" : ""}`
              : "Write or paste your code here"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {code && (
            <button
              onClick={() => onCodeChange("")}
              className="px-3 py-1.5 text-[11px] font-medium rounded-lg bg-white/5 border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:bg-white/10 hover:text-[var(--color-text-secondary)] transition-all duration-200 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={handleCopy}
            disabled={!code}
            className="px-3 py-1.5 text-[11px] font-semibold rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border-default)] text-[var(--color-accent)] hover:bg-[var(--color-bg-input)] hover:border-[var(--color-accent)]/40 hover:shadow-lg hover:shadow-[var(--color-accent)]/10 transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
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

      {/* Textarea */}
      <div className="flex-1 min-h-0">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          onKeyDown={handleTab}
          placeholder="// Paste or write your code here..."
          spellCheck={false}
          className="w-full h-full bg-[var(--color-bg-input)] text-[var(--color-accent)] font-mono text-sm leading-relaxed p-4 sm:p-5 rounded-xl border border-[var(--color-border-subtle)] resize-none outline-none focus:border-[var(--color-accent)]/50 focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all duration-200 placeholder:text-[var(--color-text-disabled)] custom-scrollbar"
        />
      </div>
    </div>
  );
}