import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-8 py-6  text-white border-t border-white/10 text-center md:text-left">
      {/* Left: logo + brand name */}
      <div className="flex items-center gap-2 font-bold text-lg">
        <Image src="/assets/logo.png" alt="FitLog logo" width={20} height={20} />
        FITLOG
      </div>

      {/* Right: copyright */}
      <p className="text-sm text-gray-400">
        © 2026 FitLog — Workout Library. Train hard, log honest.
      </p>
    </footer>
  );
}