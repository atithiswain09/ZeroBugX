
export default function Sidebar({
  prompt = "",
  onPromptChange,
  onSend,
}) {
  return (
    <div className="w-64 h-screen rounded-2xl bg-[#0B0F16] p-4 flex flex-col text-white border-r border-[#0F172A] shadow-2xl">

      {/* Center Wrapper */}
      <div className="flex flex-col gap-4 mt-auto mb-auto">

        {/* Title */}
        <h2 className="text-lg font-semibold text-[#22C55E] text-center">
          Prompt
        </h2>

        {/* Search/Prompt Box */}
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder=" write prompt..."
          className="
            w-full
            h-24
            resize-none
            bg-[#0D1117]
            border border-[#1E293B]
            rounded-xl
            p-3
            text-sm
            text-[#22C55E]
            focus:border-[#22C55E]
            focus:ring-2
            focus:ring-[#22C55E]/40
            outline-none
            transition
          "
        />

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onPromptChange("")}
            className="w-1/2 cursor-pointer bg-[#111827] border border-[#1F2937] 
            text-[#22C55E] rounded p-2 text-sm hover:bg-[#1A2333] hover:border-[#22C55E] transition"
          >
            Clear
          </button>

          <button
            onClick={onSend}
            className="w-1/2 bg-[#22C55E] text-black rounded p-2 text-sm cursor-pointer font-semibold hover:bg-[#16A34A] transition"
          >
            Send
          </button>
        </div>

      </div>

    </div>
  );
}
