import { Send, TerminalSquare, RotateCcw } from "lucide-react";

export default function Sidebar({
  prompt = "",
  onPromptChange,
  onSend,
  isLoading,
}) {
  const handleKeyDown = (e) => {
    // Ctrl/Cmd + Enter to send
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (prompt.trim() && !isLoading) onSend();
    }
  };

  return (
    <div className="w-full lg:w-[320px] flex flex-col h-full bg-[var(--color-bg-elevated)] rounded-xl border border-[var(--color-border-subtle)] overflow-hidden shrink-0"
      style={{ boxShadow: "var(--shadow-lg)" }}
    >
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 sm:mb-5">
          <div className="p-2 bg-[var(--color-indigo-subtle)] rounded-lg">
            <TerminalSquare className="text-[var(--color-indigo)]" size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
              Instructions
            </h2>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
              What should the AI look for?
            </p>
          </div>
        </div>

        {/* Prompt Textarea */}
        <div className="flex-1 flex flex-col relative">
          <textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Find performance bottlenecks, explain how this code works, or check for security vulnerabilities..."
            className="flex-1 w-full resize-none bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl p-4 text-sm text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-disabled)] focus:border-[var(--color-indigo)]/50 focus:ring-1 focus:ring-[var(--color-indigo)]/30 outline-none transition-all duration-200 custom-scrollbar"
          />
          {/* Character count */}
          <div className="absolute bottom-3 right-3 text-[10px] text-[var(--color-text-disabled)]">
            {prompt.length}/5000
          </div>
        </div>

        {/* Keyboard shortcut hint */}
        <p className="text-[10px] text-[var(--color-text-disabled)] mt-2 text-right">
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-[var(--color-border-subtle)] text-[9px] font-mono">
            Ctrl
          </kbd>{" "}
          +{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-[var(--color-border-subtle)] text-[9px] font-mono">
            Enter
          </kbd>{" "}
          to send
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => onPromptChange("")}
            disabled={!prompt}
            className="px-4 py-2.5 bg-white/5 border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] rounded-lg text-sm font-medium hover:bg-white/10 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
            title="Clear Prompt"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={onSend}
            disabled={isLoading || !prompt.trim()}
            className="flex-1 bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] text-white rounded-lg p-2.5 text-sm font-semibold shadow-lg shadow-[var(--color-indigo)]/20 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              <>
                <span>Analyze Code</span>
                <Send
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}