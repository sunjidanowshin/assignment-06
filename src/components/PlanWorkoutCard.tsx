"use client";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

export default function PlanWorkoutCard({
  workout,
  listType,
  onAction,
}: {
  workout: Workout;
  listType: "plan" | "saved";
  onAction: (message: string) => void;
}) {
  const { removeFromPlan, removeFromSaved, markAsDone, doneIds } = usePlan();

  const isDone = doneIds.includes(workout.id);

  function handleRemove() {
    onAction(`${workout.name} removed`);
    if (listType === "plan") {
      removeFromPlan(workout.id);
    } else {
      removeFromSaved(workout.id);
    }
  }

  function handleMarkDone() {
    markAsDone(workout.id);
    onAction(`${workout.name} marked as done`);
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-zinc-900 rounded-xl p-4">
      <div className="relative w-full sm:w-20 h-32 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <h3 className="text-white font-bold uppercase">{workout.name}</h3>
        <p className="text-gray-400 text-sm">{workout.equipment}</p>
        <div className="flex gap-4 text-sm text-gray-400 mt-1">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>⭐ {workout.rating}</span>
        </div>
      </div>

      <div className="flex gap-2 w-full sm:w-auto">
        <Link
          href={`/workouts/${workout.id}`}
          className="border border-white/30 text-white px-3 py-2 rounded-full text-sm"
        >
          View Details
        </Link>

        {listType === "plan" && (
          <button
            onClick={handleMarkDone}
            disabled={isDone}
            className="bg-lime-400 text-black px-3 py-2 rounded-full text-sm disabled:opacity-50"
          >
            {isDone ? "✓ Done" : "✓ Mark as Done"}
          </button>
        )}

        <button onClick={handleRemove} className="text-gray-400 px-3 py-2">
          ✕
        </button>
      </div>
    </div>
  );
}