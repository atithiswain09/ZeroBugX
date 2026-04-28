import Sidebar from "../components/Sidebar";
import CodeEditor from "../components/CodeEditor";
import Response from "../components/Response";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { sendPrompt } from "../api/Ai.api";
import toast from "react-hot-toast";
import { Settings2, Code, Layout } from "lucide-react";

export default function ReviewPage() {
  const [code, setCode] = useState("");
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("config"); // "config", "code", "review"
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSend = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first.");
      return;
    }

    setIsLoading(true);
    try {
      const responseData = await sendPrompt({ prompt: prompt.trim(), code });
      setData(responseData);
      // Automatically switch to review tab on mobile after sending
      if (!isLargeScreen) setActiveTab("review");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to get AI review. Please try again.";
      toast.error(msg);
      console.error("[ReviewPage] Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col font-sans overflow-hidden selection:bg-[var(--color-indigo)]/30 bg-[var(--color-bg-primary)]">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[15%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[var(--color-indigo)]/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[50%] rounded-full bg-[var(--color-accent)]/5 blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[20%] left-[40%] w-[30%] h-[30%] rounded-full bg-purple-500/5 blur-[100px] animate-float" />
      </div>

      <div className="z-10 flex flex-col h-full w-full">
        <Navbar />

        {/* Main Workspace */}
        <div className="flex-1 mt-[64px] p-3 sm:p-4 md:p-5 lg:p-6 overflow-hidden flex flex-col animate-fade-in">
          
          {/* Mobile Tab Selector */}
          {!isLargeScreen && (
            <div className="flex items-center gap-1 p-1 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl mb-3 shadow-lg">
              <button
                onClick={() => setActiveTab("config")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                  activeTab === "config"
                    ? "bg-[var(--color-indigo)] text-white shadow-md shadow-[var(--color-indigo)]/20"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-white/5"
                }`}
              >
                <Settings2 size={14} />
                <span>Config</span>
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                  activeTab === "code"
                    ? "bg-[var(--color-indigo)] text-white shadow-md shadow-[var(--color-indigo)]/20"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-white/5"
                }`}
              >
                <Code size={14} />
                <span>Code</span>
              </button>
              <button
                onClick={() => setActiveTab("review")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                  activeTab === "review"
                    ? "bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent)]/20"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-white/5"
                }`}
              >
                <Layout size={14} />
                <span>Review</span>
                {data && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>
            </div>
          )}

          <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 min-h-0 w-full max-w-[1800px] mx-auto">
            {(isLargeScreen || activeTab === "config") && (
              <Sidebar
                prompt={prompt}
                onPromptChange={setPrompt}
                onSend={handleSend}
                isLoading={isLoading}
              />
            )}
            
            {(isLargeScreen || activeTab === "code") && (
              <CodeEditor code={code} onCodeChange={setCode} />
            )}
            
            {(isLargeScreen || activeTab === "review") && (
              <Response data={data} loading={isLoading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
