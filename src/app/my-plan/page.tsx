"use client";
import { useState, useMemo, useEffect } from "react";
import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import { Workout } from "@/types/workout";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";

type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const { plan, saved } = usePlan();
  const [activeTab, setActiveTab] = useState("today");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  }

  const activeList = activeTab === "today" ? plan : saved;

  const sortedList = useMemo(() => {
    const list = [...activeList];
    list.sort((a: Workout, b: Workout) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
    return list;
  }, [activeList, sortBy]);

  const totalMinutes = activeList.reduce((sum: number, w: Workout) => sum + w.duration, 0);
  const totalCalories = activeList.reduce((sum: number, w: Workout) => sum + w.caloriesBurned, 0);

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
            <p className="text-white text-xl sm:text-2xl font-bold">{activeList.length}</p>
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

        <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
          <div className="flex gap-2">
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

          <div className="flex flex-col text-sm">
            <label htmlFor="sortBy" className="text-gray-400 mb-1">
              Sort By
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-zinc-900 text-white border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-lime-400"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm">Loading workouts…</p>
            </div>
          ) : (
            <>
              {activeTab === "today" && (
                sortedList.length === 0 ? (
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
                    {sortedList.map((workout: Workout) => (
                      <PlanWorkoutCard
                        key={workout.id}
                        workout={workout}
                        listType="plan"
                        onAction={showToast}
                      />
                    ))}
                  </div>
                )
              )}

              {activeTab === "saved" && (
                sortedList.length === 0 ? (
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
                    {sortedList.map((workout: Workout) => (
                      <PlanWorkoutCard
                        key={workout.id}
                        workout={workout}
                        listType="saved"
                        onAction={showToast}
                      />
                    ))}
                  </div>
                )
              )}
            </>
          )}
        </div>

        {toast && (
          <div className="fixed bottom-6 right-6 bg-white text-black px-4 py-3 rounded-lg shadow-lg text-sm font-medium">
            {toast}
          </div>
        )}
      </div>
    </section>
  );
}