export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-4 border-zinc-700 border-t-lime-400 rounded-full animate-spin" />
      <p className="text-gray-400 text-sm mt-4">Loading workouts…</p>
    </div>
  );
}