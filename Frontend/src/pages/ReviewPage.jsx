import Sidebar from "../components/Sidebar";
import CodeEditor from "../components/CodeEditor";
import Response from "../components/Response";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { sendPrompt } from "../api/Ai.api";
import toast from "react-hot-toast";

export default function ReviewPage() {
  const [code, setCode] = useState("");
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first.");
      return;
    }

    setIsLoading(true);
    try {
      const responseData = await sendPrompt({ prompt: prompt.trim(), code });
      setData(responseData);
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
        <div className="flex-1 mt-[64px] p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden flex flex-col animate-fade-in">
          <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 min-h-0 w-full max-w-[1800px] mx-auto">
            <Sidebar
              prompt={prompt}
              onPromptChange={setPrompt}
              onSend={handleSend}
              isLoading={isLoading}
            />
            <CodeEditor code={code} onCodeChange={setCode} />
            <Response data={data} loading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
