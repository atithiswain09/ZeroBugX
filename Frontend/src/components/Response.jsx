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
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium text-[var(--color-text-disabled)] hover:text-[var(--color-text-secondary)] hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
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
          className={`block px-4 py-4 text-[13px] leading-relaxed font-mono text-[var(--color-accent)] !bg-transparent ${
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
      className="w-full lg:w-[420px] xl:w-[480px] flex flex-col h-full bg-[var(--color-bg-elevated)] rounded-xl border border-[var(--color-border-subtle)] overflow-hidden shrink-0"
      style={{ boxShadow: "var(--shadow-lg)" }}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[var(--color-accent-subtle)] rounded-md">
            <Sparkles size={16} className="text-[var(--color-accent)]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] leading-none">
              AI Review
            </h3>
            <p className="text-[10px] text-[var(--color-text-disabled)] mt-0.5">
              Powered by Gemini
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {data?.response && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium hover:bg-white/5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-all cursor-pointer"
              title="Copy full response"
            >
              {copied ? (
                <Check size={13} className="text-[var(--color-success)]" />
              ) : (
                <Copy size={13} />
              )}
            </button>
          )}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-[var(--color-border-subtle)] rounded-full">
            <span
              className={`w-1.5 h-1.5 rounded-full ${statusDot} ${
                loading ? "animate-pulse" : ""
              }`}
            />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              {statusLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 custom-scrollbar relative bg-[var(--color-bg-primary)]">
        {loading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center h-full gap-5">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-[var(--color-border-subtle)]" />
              <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-t-[var(--color-accent)] animate-spin" />
              <div className="absolute inset-2 w-8 h-8 rounded-full border-2 border-transparent border-b-[var(--color-indigo)] animate-spin-reverse" />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-[var(--color-accent)] text-sm font-medium">
                Analyzing your code...
              </p>
              <p className="text-[var(--color-text-disabled)] text-xs">
                This might take a few seconds
              </p>
            </div>
            {/* Shimmer skeleton */}
            <div className="w-full space-y-3 mt-4">
              {[100, 85, 92, 70, 88].map((w, i) => (
                <div
                  key={i}
                  className="h-3 rounded-full animate-shimmer"
                  style={{
                    width: `${w}%`,
                    animationDelay: `${i * 0.15}s`,
                    background:
                      "linear-gradient(90deg, var(--color-bg-card) 0%, var(--color-bg-elevated) 50%, var(--color-bg-card) 100%)",
                    backgroundSize: "200% 100%",
                  }}
                />
              ))}
            </div>
          </div>
        ) : data?.response ? (
          /* Markdown Content */
          <div className="animate-fade-in">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {data.response}
            </ReactMarkdown>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full text-center gap-5 opacity-60">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-[var(--color-border-subtle)] flex items-center justify-center animate-float">
              <Bot size={28} className="text-[var(--color-text-disabled)]" />
            </div>
            <div>
              <p className="text-[var(--color-text-muted)] text-sm font-medium">
                Awaiting Instructions
              </p>
              <p className="text-[var(--color-text-disabled)] text-xs mt-1.5 max-w-[240px] leading-relaxed">
                Enter a prompt and paste your code to receive AI-powered
                feedback, bug detection, and improvement suggestions.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[var(--color-text-disabled)]">
              <ChevronDown size={14} className="animate-bounce" />
              <span className="text-[11px]">Write a prompt to begin</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
