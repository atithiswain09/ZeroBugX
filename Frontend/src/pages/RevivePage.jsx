import Sidebar from "../components/Sidebar";
import CodeEditor from "../components/CodeEditor";
import Response from "../components/Responce";
import Navbar from "../components/Navbar";

import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { sendPrompt } from "../api/Ai.api";
export default function RevivePage() {
  const [code, setcode] = useState("");
  const [prompt, setprompt] = useState("");
  const [data, setdata] = useState();
  const [loding,setloding]=useState(false);
  const Onsend = async () => {
    setloding(true);
    const data = await sendPrompt({ prompt, code });
    setdata(data);
    setloding(false);
  };
  

  return (
    <div className="bg-black w-full h-screen flex p-10 mt-20">
      <Navbar />
      <div className="gap-10 w-full flex">
        <Sidebar prompt={prompt} onPromptChange={setprompt} onSend={Onsend} />
        <CodeEditor code={code} onCodeChange={setcode} />
        <Response data={data} loding={loding} />
      </div>
    </div>
  );
}
