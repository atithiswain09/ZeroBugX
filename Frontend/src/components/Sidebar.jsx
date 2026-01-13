export default function Sidebar({
  prompt = "",
  onPromptChange,
  onSend,
}) {
  return (
    <div className="
      w-full 
      lg:w-80
      lg:h-full
      rounded-2xl 
      lg:rounded-none
      lg:rounded-l-2xl
      bg-[#0B0F16] 
      p-6 
      lg:p-5
      flex 
      flex-col 
      text-white 
      border 
      border-[#0F172A]
      lg:border-r 
      lg:border-t-0
      lg:border-b-0
      lg:border-l-0
      shadow-2xl
      mb-4
      lg:mb-0
    ">

      {/* Center Wrapper */}
      <div className="flex flex-col gap-5 my-auto">

        {/* Title */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#22C55E] mb-1">
            Prompt
          </h2>
          <p className="text-xs text-gray-500">
            Write your instructions below
          </p>
        </div>

        {/* Search/Prompt Box */}
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Code am little bitconfusing how the things are work. Pls Explain it with simple and Easy way ?"
          className="
            w-full
            h-32
            sm:h-36
            lg:h-40
            resize-none
            bg-[#0D1117]
            border 
            border-[#1E293B]
            rounded-xl
            p-4
            text-sm
            leading-relaxed
            text-[#22C55E]
            placeholder:text-gray-600
            focus:border-[#22C55E]
            focus:ring-2
            focus:ring-[#22C55E]/40
            outline-none
            transition-all
            duration-200
          "
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onPromptChange("")}
            className="
              flex-1 
              cursor-pointer 
              bg-[#111827] 
              border 
              border-[#1F2937] 
              text-[#22C55E] 
              rounded-lg 
              p-3 
              text-sm 
              font-medium
              hover:bg-[#1A2333] 
              hover:border-[#22C55E] 
              transition-all
              duration-200
              active:scale-95
            "
          >
            Clear
          </button>

          <button
            onClick={onSend}
            className="
              flex-1 
              bg-[#22C55E] 
              text-black 
              rounded-lg 
              p-3 
              text-sm 
              cursor-pointer 
              font-bold
              hover:bg-[#16A34A] 
              hover:shadow-lg
              hover:shadow-[#22C55E]/30
              transition-all
              duration-200
              active:scale-95
            "
          >
            Send
          </button>
        </div>

      </div>

    </div>
  );
}