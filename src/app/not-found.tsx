import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-lime-400 font-bold text-sm tracking-widest uppercase mb-4">
        Error 404
      </p>
      <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold uppercase mb-4">
        Lift Not Found
      </h1>
      <p className="text-gray-400 max-w-md mb-8">
        Looks like this page skipped leg day. The route you&apos;re looking for
        doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="bg-lime-400 text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-lime-300 transition"
      >
        Go to Workouts
      </Link>
    </section>
  );
}