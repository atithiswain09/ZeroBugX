import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AiResponse({ data }) {
      console.log(data)
  return (
    <div className="w-[28%] h-80vh bg-[#070c14] rounded-2xl border border-green-500/20 p-4 shadow-inner">

      <h3 className="text-green-400 font-semibold mb-3">
        AI Review
      </h3>

      <div className="h-[90%] bg-[#02060c] rounded-xl border border-green-500/20 p-4 overflow-y-auto text-sm">

        <p className="text-green-400 mb-2">
          Review came from AI
        </p>

        {data?.response && (
          <div className="prose prose-invert reset-tailwind max-w-none text-white">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data.response}
            </ReactMarkdown>
             
          </div>
          
        ) }
          {/* { <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {Markdown}
            </ReactMarkdown>} */}
      </div>
    </div>
  );
}
