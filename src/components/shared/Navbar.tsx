"use client";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Workouts", href: "/", active: true },
  { label: "My Plan", href: "/my-plan", active: false },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 text-white border-b border-white/10">
      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-lg">
       <Image src="/assets/logo.png" alt="FitLog logo" width={24} height={24} />
        FITLOG
      </div>

      {/* Dynamic nav items */}
      <ul className="flex gap-6 items-center">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`px-4 py-1.5 rounded-full text-sm transition ${
                item.active
                  ? "bg-lime-400/10 text-lime-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right side: Plan (filled) + Saved (outline) badges */}
      <div className="flex items-center gap-6">
        <Link href="/my-plan" className="flex items-center gap-2 text-sm">
          <span className="text-gray-300">Plan</span>
          <span className="bg-lime-400 text-black w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">
            0
          </span>
        </Link>
        <Link href="/my-plan" className="flex items-center gap-2 text-sm">
          <span className="text-gray-300">Saved</span>
          <span className="border border-white/40 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">
            0
          </span>
        </Link>
      </div>
    </nav>
  );
}

