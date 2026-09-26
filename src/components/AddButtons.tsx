"use client";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

export default function AddButtons({ workout }: { workout: Workout }) {
  const { plan, saved, addToPlan, addToSaved } = usePlan();
  const [toast, setToast] = useState("");

  const alreadyInPlan = plan.some((w: Workout) => w.id === workout.id);
  const alreadyInSaved = saved.some((w: Workout) => w.id === workout.id);

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  }

  function handleAddToPlan() {
    addToPlan(workout);
    showToast("Added to today's plan");
  }

  function handleSaveForLater() {
    addToSaved(workout);
    showToast("Saved for later");
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
        <button
          onClick={handleAddToPlan}
          disabled={alreadyInPlan}
          className="bg-lime-400 text-black px-5 py-2.5 rounded-full text-sm font-semibold disabled:opacity-50"
        >
          {alreadyInPlan ? "✓ Added" : "+ Add to today's plan"}
        </button>

        <button
          onClick={handleSaveForLater}
          disabled={alreadyInSaved}
          className="border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-semibold disabled:opacity-50"
        >
          {alreadyInSaved ? "✓ Saved" : "🔖 Save for later"}
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-white text-black px-4 py-3 rounded-lg shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}
    </>
  );
}