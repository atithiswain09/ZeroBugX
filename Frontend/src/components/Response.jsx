import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles, Loader2, Bot, Copy, Check, ChevronDown } from "lucide-react";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";

/**
 * Custom code block component with copy button and language label.
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
    <div className="group relative my-4 rounded-xl overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-bg-card)] border-b border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          {lang && (
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--color-text-disabled)] ml-2">
              {lang}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium text-[var(--color-text-disabled)] hover:text-[var(--color-text-secondary)] hover:bg-white/5 transition-all sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={11} className="text-[var(--color-success)]" />
              <span className="text-[var(--color-success)]">Copied</span>
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
          className={`block px-3 sm:px-4 py-3 sm:py-4 text-[12px] sm:text-[13px] leading-relaxed font-mono text-[var(--color-accent)] !bg-transparent ${
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
 * Inline code styling.
 */
function InlineCode({ children }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-[var(--color-accent-subtle)] text-[var(--color-accent)] text-[12px] font-mono font-medium border border-[var(--color-accent)]/10">
      {children}
    </code>
  );
}

/**
 * Custom components map for ReactMarkdown.
 */
const markdownComponents = {
  // ── Code blocks ──
  code({ inline, className, children, ...props }) {
    if (inline) {
      return <InlineCode>{children}</InlineCode>;
    }
    return <CodeBlock className={className}>{children}</CodeBlock>;
  },

  // ── Headings with accent left border ──
  h1({ children }) {
    return (
      <h1 className="text-xl font-bold text-[var(--color-text-primary)] mt-6 mb-3 pb-2 border-b border-[var(--color-border-subtle)]">
        {children}
      </h1>
    );
  },
  h2({ children }) {
    return (
      <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mt-5 mb-2 flex items-center gap-2">
        <span className="w-1 h-5 rounded-full bg-[var(--color-accent)]" />
        {children}
      </h2>
    );
  },
  h3({ children }) {
    return (
      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mt-4 mb-2 flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-[var(--color-indigo)]" />
        {children}
      </h3>
    );
  },
  h4({ children }) {
    return (
      <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mt-3 mb-1.5">
        {children}
      </h4>
    );
  },

  // ── Paragraphs ──
  p({ children }) {
    return (
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">
        {children}
      </p>
    );
  },

  // ── Lists ──
  ul({ children }) {
    return <ul className="space-y-1.5 mb-3 ml-1">{children}</ul>;
  },
  ol({ children }) {
    return (
      <ol className="space-y-1.5 mb-3 ml-1 list-decimal list-inside">
        {children}
      </ol>
    );
  },
  li({ children }) {
    return (
      <li className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex items-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/40 mt-[7px] shrink-0" />
        <span className="flex-1">{children}</span>
      </li>
    );
  },

  // ── Blockquotes ──
  blockquote({ children }) {
    return (
      <blockquote className="border-l-2 border-[var(--color-indigo)] bg-[var(--color-indigo-subtle)] rounded-r-lg px-4 py-3 my-3 text-sm text-[var(--color-text-secondary)]">
        {children}
      </blockquote>
    );
  },

  // ── Links ──
  a({ href, children }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] underline decoration-[var(--color-accent)]/30 hover:decoration-[var(--color-accent)] transition-colors"
      >
        {children}
      </a>
    );
  },

  // ── Strong / em ──
  strong({ children }) {
    return (
      <strong className="font-semibold text-[var(--color-text-primary)]">
        {children}
      </strong>
    );
  },
  em({ children }) {
    return (
      <em className="italic text-[var(--color-text-secondary)]">{children}</em>
    );
  },

  // ── Horizontal rule ──
  hr() {
    return (
      <hr className="border-none h-px bg-gradient-to-r from-transparent via-[var(--color-border-default)] to-transparent my-5" />
    );
  },

  // ── Tables ──
  table({ children }) {
    return (
      <div className="my-4 overflow-x-auto rounded-xl border border-[var(--color-border-subtle)]">
        <table className="w-full text-sm">{children}</table>
      </div>
    );
  },
  thead({ children }) {
    return (
      <thead className="bg-[var(--color-bg-card)] border-b border-[var(--color-border-subtle)]">
        {children}
      </thead>
    );
  },
  th({ children }) {
    return (
      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
        {children}
      </th>
    );
  },
  td({ children }) {
    return (
      <td className="px-4 py-2.5 text-sm text-[var(--color-text-secondary)] border-t border-[var(--color-border-subtle)]">
        {children}
      </td>
    );
  },

  // ── Images ──
  img({ src, alt }) {
    return (
      <img
        src={src}
        alt={alt || ""}
        className="rounded-xl border border-[var(--color-border-subtle)] max-w-full my-3"
        loading="lazy"
      />
    );
  },
};

export default function Response({ data, loading }) {
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

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 custom-scrollbar relative bg-transparent z-10">
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
            {/* Shimmer skeleton */}
            <div className="w-full space-y-4 mt-6 px-4">
              {[100, 85, 95, 70].map((w, i) => (
                <div
                  key={i}
                  className="h-2 rounded-full animate-shimmer"
                  style={{
                    width: `${w}%`,
                    animationDelay: `${i * 0.15}s`,
                    background:
                      "linear-gradient(90deg, #161b22 0%, #1f2937 50%, #161b22 100%)",
                    backgroundSize: "200% 100%",
                  }}
                />
              ))}
            </div>
          </div>
        ) : data?.response ? (
          /* Markdown Content */
          <div className="animate-fade-in text-[14px]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {data.response}
            </ReactMarkdown>
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
