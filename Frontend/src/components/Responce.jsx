import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PacmanLoader } from "react-spinners";

export default function AiResponse({ data, loading }) {
  console.log(data);
  
  return (
    <div className="
      w-full 
      lg:w-[350px]
      xl:w-[400px]
      min-h-[400px]
      lg:min-h-0
      lg:h-full
      bg-[#070c14] 
      rounded-2xl 
      border 
      border-green-500/20 
      p-5
      lg:p-6
      shadow-inner
      flex
      flex-col
    ">

      {/* Header */}
      <div className="mb-4 pb-3 border-b border-green-500/20">
        <h3 className="text-lg font-bold text-green-400 mb-1">
         AI Review
        </h3>
        <p className="text-xs text-gray-500">
          Analysis and suggestions from AI
        </p>
      </div>

      {/* Content Area */}
      <div className="
        flex-1
        min-h-0
        bg-[#02060c] 
        rounded-xl 
        border 
        border-green-500/20 
        p-4
        lg:p-5
        overflow-y-auto 
        text-sm
        scrollbar-thin
        scrollbar-thumb-green-500/30
        scrollbar-track-[#02060c]
      ">

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <PacmanLoader 
              color="#22C55E" 
              size={20}
              className="mt-2"
            />
            <p className="text-green-400 text-xs animate-pulse">
              Analyzing your code...
            </p>
          </div>
        ) : (
          <>
            {/* Response Header */}
            {data?.response && (
              <div className="mb-3 pb-2 border-b border-green-500/10">
                <p className="text-green-400 text-xs font-semibold">
                  📝 Review Results
                </p>
              </div>
            )}

            {/* AI Response Content */}
            {data?.response ? (
              <div className="
                prose 
                prose-invert 
                prose-sm
                max-w-none 
                text-gray-300
                prose-headings:text-green-400
                prose-headings:font-bold
                prose-p:leading-relaxed
                prose-pre:bg-[#0D1117]
                prose-pre:border
                prose-pre:border-green-500/20
                prose-code:text-green-400
                prose-strong:text-green-400
                prose-li:marker:text-green-400
              ">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {data.response}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                <p className="text-gray-500 text-sm">
                  No review yet
                </p>
                <p className="text-gray-600 text-xs max-w-[200px]">
                  Write your code and send a prompt to get AI analysis
                </p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}