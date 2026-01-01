import Sidebar from "../components/Sidebar";
import CodeEditor from "../components/CodeEditor";
import Response from "../components/Responce";
import Navbar from "../components/Navbar";
export default function RevivePage() {
  return (
    <div className="bg-black w-full flex p-10 mt-20">
      <Navbar />
      <div className="gap-10 w-full flex">
        <Sidebar />
        <CodeEditor />
        <Response />
      </div>
    </div>
  );
}
