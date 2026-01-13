import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "../components/Spinner";

export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleStartReview() {
    setLoading(true); // 🔥 show spinner

    setTimeout(() => {
      navigate("/reviwe"); 
    }, 1000);
  }

  // 🔥 THIS IS THE MAGIC
  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />

      <div className="w-full min-h-screen bg-gradient-to-b from-[#05060f] to-[#02040a] flex justify-center items-center px-4 pt-20">
        <div className="max-w-4xl text-center text-[#f2f2f2]">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            AI-Powered{" "}
            <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              Code Reviewer
            </span>
            <br />
            BugDetector
          </h1>

          <p className="mt-4 text-xl opacity-90">
            Improve Your Code Quality Using{" "}
            <span className="text-green-400 font-bold">ZeroBugX</span>
          </p>

          <p className="mt-2 opacity-70">
            Faster – Smarter – Cleaner Code
          </p>

          <button
            onClick={handleStartReview}
            className="mt-10 px-8 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            Start Reviewing
          </button>
        </div>
      </div>
    </>
  );
}
