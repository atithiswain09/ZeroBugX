import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles, Bot, Copy, Check, ChevronDown, User, HeartHandshake, Zap, ShieldAlert } from "lucide-react";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";

/**
 * Custom code block component with copy button and language label.
 * Designed to contrast beautifully inside the white card.
 */
function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const lang = match ? match[1] : "";
  const codeString = String(children).replace(/\n$/, "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="group relative my-4 rounded-xl overflow-hidden border border-slate-800 bg-[#090d16] shadow-inner">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0f141e] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          {lang && (
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 ml-2">
              {lang}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={11} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={11} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <pre className="!m-0 !rounded-none !border-none !bg-transparent overflow-x-auto">
        <code
          className={`block px-3 sm:px-4 py-3 sm:py-4 text-[12px] sm:text-[13px] leading-relaxed font-mono text-emerald-400 !bg-transparent ${
            className || ""
          }`}
        >
          {children}
        </code>
      </pre>
    </div>
  );
}

/**
 * Inline code styling for light background.
 */
function InlineCode({ children }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-slate-100 text-rose-600 text-[12px] font-mono font-semibold border border-slate-200">
      {children}
    </code>
  );
}

/**
 * Custom components map for ReactMarkdown inside the light card.
 */
const markdownComponents = {
  code({ inline, className, children, ...props }) {
    if (inline) {
      return <InlineCode>{children}</InlineCode>;
    }
    return <CodeBlock className={className}>{children}</CodeBlock>;
  },

  h1({ children }) {
    return (
      <h1 className="text-lg font-bold text-slate-900 mt-5 mb-2.5 pb-1 border-b border-slate-200">
        {children}
      </h1>
    );
  },
  h2({ children }) {
    return (
      <h2 className="text-md font-semibold text-slate-900 mt-4 mb-2 flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-blue-600" />
        {children}
      </h2>
    );
  },
  h3({ children }) {
    return (
      <h3 className="text-sm font-semibold text-slate-800 mt-3 mb-1.5 flex items-center gap-2">
        <span className="w-1 h-3.5 rounded-full bg-indigo-500" />
        {children}
      </h3>
    );
  },
  h4({ children }) {
    return (
      <h4 className="text-xs font-semibold text-slate-800 mt-2.5 mb-1">
        {children}
      </h4>
    );
  },

  p({ children }) {
    return (
      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2.5">
        {children}
      </p>
    );
  },

  ul({ children }) {
    return <ul className="space-y-1 mb-2.5 pl-1">{children}</ul>;
  },
  ol({ children }) {
    return (
      <ol className="space-y-1 mb-2.5 pl-1 list-decimal list-inside text-xs sm:text-sm text-slate-700">
        {children}
      </ol>
    );
  },
  li({ children }) {
    return (
      <li className="text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-600/50 mt-[7px] shrink-0" />
        <span className="flex-1">{children}</span>
      </li>
    );
  },

  blockquote({ children }) {
    return (
      <blockquote className="border-l-2 border-indigo-500 bg-indigo-50/50 rounded-r-lg px-3 py-2 my-2 text-xs sm:text-sm text-slate-600">
        {children}
      </blockquote>
    );
  },

  a({ href, children }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700 underline decoration-blue-600/30 hover:decoration-blue-600 transition-colors"
      >
        {children}
      </a>
    );
  },

  strong({ children }) {
    return (
      <strong className="font-semibold text-slate-900">
        {children}
      </strong>
    );
  },
  em({ children }) {
    return (
      <em className="italic text-slate-600">{children}</em>
    );
  },

  hr() {
    return (
      <hr className="border-none h-px bg-slate-200 my-4" />
    );
  },

  table({ children }) {
    return (
      <div className="my-3 overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-xs sm:text-sm">{children}</table>
      </div>
    );
  },
  thead({ children }) {
    return (
      <thead className="bg-slate-50 border-b border-slate-200">
        {children}
      </thead>
    );
  },
  th({ children }) {
    return (
      <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {children}
      </th>
    );
  },
  td({ children }) {
    return (
      <td className="px-3 py-2 text-xs sm:text-sm text-slate-600 border-t border-slate-100">
        {children}
      </td>
    );
  },

  img({ src, alt }) {
    return (
      <img
        src={src}
        alt={alt || ""}
        className="rounded-lg border border-slate-200 max-w-full my-2"
        loading="lazy"
      />
    );
  },
};

/**
 * Animated mock metrics chart for review output.
 */
function ResponseChart() {
  const metrics = [
    { label: "Security", value: 85, color: "bg-emerald-500" },
    { label: "Performance", value: 65, color: "bg-blue-600" },
    { label: "Cleanliness", value: 90, color: "bg-blue-600" },
    { label: "Reliability", value: 70, color: "bg-blue-600" },
    { label: "Overall", value: 78, color: "bg-gradient-to-t from-blue-600 to-indigo-500" },
  ];

  return (
    <div className="bg-slate-50/80 border border-slate-100/80 rounded-2xl p-4 my-4">
      <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <Zap size={12} className="text-blue-600" /> Analysis Metrics
      </h4>
      <div className="flex justify-between items-end h-20 gap-2.5 px-1">
        {metrics.map((m, i) => (
          <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
            <span className="text-[9px] font-bold text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {m.value}%
            </span>
            <div className="w-full bg-slate-200/50 rounded-md h-full flex items-end overflow-hidden">
              <div 
                className={`w-full rounded-md transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${m.color}`}
                style={{ height: `${m.value}%` }}
              />
            </div>
            <span className="text-[8px] sm:text-[9px] font-semibold text-slate-500 mt-2 truncate max-w-full text-center">
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Recommendation Banner inside the card.
 */
function RecommendationBanner() {
  return (
    <div className="flex items-center gap-3 p-3 bg-blue-50/50 border border-blue-100/50 rounded-xl mt-4">
      <div className="w-9 h-9 rounded-full border border-blue-200 bg-white flex items-center justify-center text-[10px] font-black text-blue-600 shrink-0 shadow-sm">
        92%
      </div>
      <div>
        <h4 className="text-[11px] font-bold text-slate-700">Code Optimization Recommended</h4>
        <p className="text-[9px] text-slate-500">Consider splitting large conditions or modules to improve maintainability.</p>
      </div>
    </div>
  );
}

export default function Response({ data, loading, prompt, onSuggest }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!data?.response) return;
    try {
      await navigator.clipboard.writeText(data.response);
      setCopied(true);
      toast.success("Response copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy.");
    }
  }, [data?.response]);

  const statusLabel = loading
    ? "Analyzing"
    : data?.response
    ? "Complete"
    : "Ready";

  const statusDot = loading
    ? "bg-[var(--color-warning)]"
    : data?.response
    ? "bg-[var(--color-success)]"
    : "bg-[var(--color-text-disabled)]";

  const suggestions = [
    { label: "✨ Auto-fix code issues", prompt: "Can you provide the complete corrected code with the optimizations applied?" },
    { label: "🔍 Explain time complexity", prompt: "Explain the time and space complexity of the code I provided." },
    { label: "🧪 Generate Jest test cases", prompt: "Can you write unit tests for this code?" },
    { label: "🛡️ Check security flaws", prompt: "Are there any potential security vulnerabilities in this code?" }
  ];

  return (
    <div
      className="w-full lg:w-[380px] xl:w-[440px] 2xl:w-[480px] flex flex-col h-full bg-[#0b0f17]/90 backdrop-blur-xl rounded-2xl border border-[var(--color-border-subtle)] overflow-hidden shrink-0 relative shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/[0.02] to-transparent pointer-events-none" />
      
      {/* Sleek Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent opacity-50" />

      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-5 py-3 sm:py-4 border-b border-[var(--color-border-subtle)] bg-[#0f141e]/50 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--color-accent)]/20 blur-md rounded-full" />
            <div className="relative p-2 bg-gradient-to-b from-[#1a2235] to-[#0f141e] rounded-xl border border-[var(--color-accent)]/30 shadow-inner">
              <Sparkles className="text-[var(--color-accent)]" size={16} strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-[#e2e8f0] tracking-wide uppercase">
              Analysis Output
            </h3>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5 font-medium flex items-center gap-1.5">
              Powered by <span className="text-[var(--color-indigo)] font-semibold">Gemini AI</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {data?.response && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold hover:bg-white/10 text-[var(--color-text-secondary)] hover:text-white transition-all cursor-pointer shadow-sm border border-[var(--color-border-subtle)] bg-[#161b22]"
              title="Copy full response"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-[var(--color-success)]" />
                  <span className="text-[var(--color-success)]">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  Copy
                </>
              )}
            </button>
          )}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] border border-[var(--color-border-subtle)] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
            <span
              className={`w-2 h-2 rounded-full ${statusDot} ${
                loading ? "animate-pulse shadow-[0_0_8px_var(--color-warning)]" : ""
              } ${data?.response ? "shadow-[0_0_8px_var(--color-success)]" : ""}`}
            />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              {statusLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ── Content Area ── */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 custom-scrollbar relative bg-transparent z-10 flex flex-col gap-4">
        {loading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-[var(--color-border-subtle)]" />
              <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent border-t-[var(--color-accent)] animate-spin" style={{ animationDuration: '1.5s' }} />
              <div className="absolute inset-2 w-12 h-12 rounded-full border-2 border-transparent border-b-[var(--color-indigo)] animate-spin-reverse" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles size={16} className="text-[var(--color-accent)] animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[var(--color-accent)] text-sm font-semibold tracking-wide">
                ANALYZING CODEBASE...
              </p>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-disabled)] animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-disabled)] animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-disabled)] animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        ) : data?.response ? (
          /* Chat-Card Style Output */
          <div className="animate-fade-in flex flex-col gap-4 w-full h-full justify-between">
            <div className="flex flex-col gap-4">
              {/* 1. User Prompt Bubble (Matches the blue query bubble in the screenshot) */}
              {prompt && (
                <div className="flex flex-col items-end gap-1 w-full">
                  <div className="bg-[#0e5aee] text-white text-xs sm:text-sm px-4 py-3 rounded-2xl max-w-[85%] rounded-tr-sm shadow-md leading-relaxed">
                    {prompt}
                  </div>
                  <span className="text-[9px] text-slate-500 font-semibold mr-1">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}

              {/* 2. Bot Message Card Group */}
              <div className="flex gap-2.5 items-start w-full min-w-0">
                {/* Small Bot Icon Circle */}
                <div className="w-8 h-8 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0 shadow-sm mt-1">
                  <Bot size={16} />
                </div>

                {/* The main white card */}
                <div className="flex-1 bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] text-slate-800 min-w-0">
                  {/* Markdown Content */}
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {data.response}
                  </ReactMarkdown>

                  {/* Custom Code Metrics Chart */}
                  <ResponseChart />

                  {/* Action Recommendation Banner */}
                  <RecommendationBanner />
                </div>
              </div>
            </div>

            {/* 3. Interactive Suggestion Chips (at the bottom of response view) */}
            {onSuggest && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/50 mt-2">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSuggest(s.prompt)}
                    className="px-3.5 py-2 rounded-full border border-slate-700/60 bg-[#111827]/60 hover:bg-[#1f2937] text-[11px] font-semibold text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full text-center gap-6 opacity-80">
            <div className="relative group">
              <div className="absolute inset-0 bg-[var(--color-indigo)]/20 blur-xl rounded-full group-hover:bg-[var(--color-indigo)]/30 transition-colors duration-500" />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#161b22] to-[#0f141e] border border-[var(--color-border-subtle)] flex items-center justify-center animate-float shadow-xl">
                <Bot size={32} strokeWidth={1.5} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-indigo)] transition-colors duration-500" />
              </div>
            </div>
            <div>
              <p className="text-[#e2e8f0] text-[15px] font-semibold tracking-wide">
                Awaiting Instructions
              </p>
              <p className="text-[var(--color-text-disabled)] text-[13px] mt-2 max-w-[280px] leading-relaxed">
                Provide your code and instructions in the panels to generate an AI-powered code review, bug detection, or refactoring suggestions.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#161b22] border border-[var(--color-border-subtle)] mt-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-indigo)] animate-pulse" />
              <span className="text-[11px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">System Ready</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
