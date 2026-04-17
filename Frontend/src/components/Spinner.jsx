export default function Spinner() {
  return (
    <div className="fixed inset-0 bg-[var(--color-bg-primary)] flex flex-col items-center justify-center z-50">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-[var(--color-border-subtle)]" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-t-[var(--color-accent)] animate-spin" />
      </div>
      <p className="mt-4 text-[var(--color-accent)] text-sm font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
}
