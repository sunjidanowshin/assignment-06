"use client";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import { Workout } from "@/types/workout";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";

export default function MyPlanPage() {
  const { plan, saved } = usePlan();
  const [activeTab, setActiveTab] = useState("today");

  const totalMinutes = plan.reduce((sum: number, w: Workout) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum: number, w: Workout) => sum + w.caloriesBurned, 0);

  return (
    <section className="px-4 sm:px-6 md:px-8 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-white text-3xl md:text-4xl font-bold uppercase">
          My Plan
        </h1>
        <p className="text-gray-400 mt-2">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
          <div className="bg-zinc-900 rounded-xl p-4">
            <p className="text-gray-400 text-xs sm:text-sm">Exercises</p>
            <p className="text-white text-xl sm:text-2xl font-bold">{plan.length}</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4">
            <p className="text-gray-400 text-xs sm:text-sm">Minutes</p>
            <p className="text-white text-xl sm:text-2xl font-bold">{totalMinutes}</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4">
            <p className="text-gray-400 text-xs sm:text-sm">Calories</p>
            <p className="text-white text-xl sm:text-2xl font-bold">{totalCalories}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-8">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === "today"
                ? "bg-lime-400 text-black"
                : "bg-zinc-900 text-gray-400"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === "saved"
                ? "bg-lime-400 text-black"
                : "bg-zinc-900 text-gray-400"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="mt-6">
          {activeTab === "today" && (
            plan.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-white font-bold text-lg">NOTHING HERE YET</p>
                <p className="text-gray-400 text-sm mt-2">
                  Browse the library and add a lift to get today moving.
                </p>
                <Link href="/" className="inline-block mt-4 bg-lime-400 text-black px-5 py-2.5 rounded-full text-sm font-semibold">
                  Go to workouts
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {plan.map((workout: Workout) => (
                  <PlanWorkoutCard key={workout.id} workout={workout} listType="plan" />
                ))}
              </div>
            )
          )}

          {activeTab === "saved" && (
            saved.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-white font-bold text-lg">NOTHING HERE YET</p>
                <p className="text-gray-400 text-sm mt-2">
                  Browse the library and add a lift to get today moving.
                </p>
                <Link href="/" className="inline-block mt-4 bg-lime-400 text-black px-5 py-2.5 rounded-full text-sm font-semibold">
                  Go to workouts
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {saved.map((workout: Workout) => (
                  <PlanWorkoutCard key={workout.id} workout={workout} listType="saved" />
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}