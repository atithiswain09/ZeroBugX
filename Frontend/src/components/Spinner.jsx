export default function Spinner() {
  return (
    <div className="fixed inset-0 bg-[#02040a] flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-gray-500 border-t-green-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-green-400 text-lg font-semibold">
        Preparing your review...
      </p>
    </div>
  );
}
