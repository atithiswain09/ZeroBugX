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
    <div className="w-full lg:w-[320px] xl:w-[340px] flex flex-col h-full bg-[#0b0f17]/90 backdrop-blur-xl rounded-2xl border border-[var(--color-border-subtle)] overflow-hidden shrink-0 relative group shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-indigo)]/[0.02] to-transparent pointer-events-none" />
      
      {/* Sleek Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-indigo)]/50 to-transparent opacity-50" />

      <div className="flex-1 flex flex-col relative z-10 p-0">
        {/* Header - IDE Style */}
        <div className="flex items-center gap-3 px-3 sm:px-5 py-3 sm:py-4 border-b border-[var(--color-border-subtle)] bg-[#0f141e]/50">
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--color-indigo)]/20 blur-md rounded-full" />
            <div className="relative p-2 bg-gradient-to-b from-[#1a2235] to-[#0f141e] rounded-xl border border-[var(--color-indigo)]/30 shadow-inner">
              <TerminalSquare className="text-[var(--color-indigo-hover)]" size={16} strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <h2 className="text-[13px] font-bold text-[#e2e8f0] tracking-wide uppercase">
              AI Inspector
            </h2>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5 font-medium">
              Configure analysis parameters
            </p>
          </div>
        </div>

        {/* Prompt Section */}
        <div className="flex-1 flex flex-col p-3 sm:p-5 relative group/textarea">
          <label className="text-xs font-semibold text-[var(--color-text-secondary)] mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-indigo)] animate-pulse" />
            Prompt Instructions
          </label>
          <div className="flex-1 relative flex flex-col rounded-xl overflow-hidden border border-[var(--color-border-subtle)] bg-[#06080d]/80 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] focus-within:border-[var(--color-indigo)]/40 focus-within:shadow-[0_0_15px_rgba(99,102,241,0.1),inset_0_2px_10px_rgba(0,0,0,0.2)] transition-all duration-300">
            <textarea
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Find performance bottlenecks, explain how this code works, or check for security vulnerabilities..."
              className="flex-1 w-full resize-none bg-transparent p-4 pb-8 text-[13px] leading-relaxed text-[#e2e8f0] placeholder:text-[var(--color-text-disabled)]/70 outline-none transition-all duration-300 custom-scrollbar"
            />
            
            {/* Status Bar inside textarea */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#06080d] to-transparent flex items-center justify-between">
              <p className="text-[10px] text-[var(--color-text-disabled)] font-medium flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-[#161b22] border border-[var(--color-border-subtle)] shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Ctrl</kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[#161b22] border border-[var(--color-border-subtle)] shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Enter</kbd>
              </p>
              <div className={`text-[10px] font-mono ${prompt.length > 4000 ? 'text-[var(--color-warning)]' : 'text-[var(--color-text-disabled)]'}`}>
                {prompt.length}/5000
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel - Fixed at Bottom */}
        <div className="p-3 sm:p-5 border-t border-[var(--color-border-subtle)] bg-[#0f141e]/50 backdrop-blur-md">
          <div className="flex gap-3">
            <button
              onClick={() => onPromptChange("")}
              disabled={!prompt}
              className="px-4 py-2.5 bg-[#161b22] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] rounded-xl text-sm font-medium hover:bg-[#1f2937] hover:text-white transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer shadow-sm"
              title="Clear Prompt"
            >
              <RotateCcw size={16} />
            </button>

            <button
              onClick={onSend}
              disabled={isLoading || !prompt.trim()}
              className="flex-1 bg-gradient-to-r from-[var(--color-indigo)] to-[#4f46e5] text-white rounded-xl p-2.5 text-[13px] font-bold shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 border border-[var(--color-indigo)]/50 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              <div className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Execute Analysis</span>
                    <Send
                      size={14}
                      strokeWidth={2.5}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                    />
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}