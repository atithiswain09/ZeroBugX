import Navbar from "../pages/Navbar";
// import Logo from "../assets/image1.png";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <div
        className="
          w-full min-h-screen 
          bg-gradient-to-b from-[#05060f] to-[#02040a] 
          flex justify-center items-center 
          px-4 pt-20
        "
      >
        <div className="max-w-4xl text-center text-[#f2f2f2]">

          {/* ---------- Title ---------- */}
          <h1
            className="
              text-4xl md:text-6xl font-extrabold 
              leading-tight md:leading-[1.15] 
              tracking-tight
            "
          >
            AI-Powered{" "}
            <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              Code Reviwer
            </span>{" "}
            &
            <br />
             BugDetector
          </h1>

          {/* ---------- Subtitle ---------- */}
          <p className="mt-4 text-xl md:text-2xl font-light opacity-90 leading-relaxed">
            Improve Your Code Quality Using{" "}
            <span className="text-green-400 font-bold">
              ZeroBugX
            </span>
          </p>

          <p className="mt-1 text-lg md:text-xl opacity-70 tracking-wide">
            Faster – Smarter – Cleaner Code
          </p>

          {/* ---------- Button ---------- */}
          <button
            className="
              mt-10 px-8 py-3 
              cursor-pointer 
              bg-green-500 
              text-white 
              rounded-lg 
              shadow-lg
              transition-all duration-300
              hover:bg-green-600 
              hover:shadow-xl 
              hover:scale-105
            "
          >
            Start ReviewIng
          </button>

        </div>
      </div>
    </>
  );
}
