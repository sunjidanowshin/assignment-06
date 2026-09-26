"use client";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

export default function LibraryGrid({ workouts }: { workouts: Workout[] }) {
  const { plan, saved } = usePlan();

  function isInPlan(workout: Workout) {
    return plan.some((item: Workout) => item.id === workout.id);
  }

  function isInSaved(workout: Workout) {
    return saved.some((item: Workout) => item.id === workout.id);
  }

  const visibleWorkouts = workouts.filter((workout) => {
    return !isInPlan(workout) && !isInSaved(workout);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
      {visibleWorkouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}