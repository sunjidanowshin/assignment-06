"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

const navItems = [
  { label: "Workouts", href: "/", active: true },
  { label: "My Plan", href: "/my-plan", active: false },
];

export default function Navbar() {
  const { plan, saved } = usePlan();
  const [open, setOpen] = useState(false);

  return (
    <nav className="text-white border-b border-white/10 px-4 md:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Image src="/assets/logo.png" alt="FitLog logo" width={24} height={24} />
          FITLOG
        </div>

        <ul className="hidden md:flex gap-6 items-center">
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

        <div className="hidden md:flex items-center gap-6">
          <Link href="/my-plan" className="flex items-center gap-2 text-sm">
            <span className="text-gray-300">Plan</span>
            <span className="bg-lime-400 text-black w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2 text-sm">
            <span className="text-gray-300">Saved</span>
            <span className="border border-white/40 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">
              {saved.length}
            </span>
          </Link>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`px-4 py-2 rounded-full text-sm w-fit ${
                item.active
                  ? "bg-lime-400/10 text-lime-400"
                  : "text-gray-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-6 pt-2 border-t border-white/10">
            <Link href="/my-plan" className="flex items-center gap-2 text-sm">
              <span className="text-gray-300">Plan</span>
              <span className="bg-lime-400 text-black w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">
                {plan.length}
              </span>
            </Link>
            <Link href="/my-plan" className="flex items-center gap-2 text-sm">
              <span className="text-gray-300">Saved</span>
              <span className="border border-white/40 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">
                {saved.length}
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

