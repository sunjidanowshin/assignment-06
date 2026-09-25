import { Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  return res.json();
}

export default async function Library() {
  const workouts = await getWorkouts();

  return (
    <section id="library" className= "px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-3xl md:text-4xl font-bold uppercase mb-2">
          The Library
        </h2>
        <p className="text-gray-400 mb-8">
          Twelve lifts covering every major muscle group.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </section>
  );
}