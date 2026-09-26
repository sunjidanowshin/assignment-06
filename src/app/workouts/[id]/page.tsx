import { Workout } from "@/types/workout";

async function getWorkout(id: string): Promise<Workout> {
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
  return res.json();
}

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkout(id);

  return (
    <section className="px-4 md:px-8 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left: image */}
        <div className="relative w-full h-72 md:h-full rounded-2xl overflow-hidden">
          <img
            src={workout.image}
            alt={workout.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right: details */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase">
            {workout.name}
          </h1>
          <p className="text-gray-400 mt-3">{workout.description}</p>

          <div className="flex gap-2 mt-4">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

        
          <div className="mt-6 bg-zinc-900 rounded-xl divide-y divide-white/10">
            {[
              ["EQUIPMENT", workout.equipment],
              ["DIFFICULTY", workout.difficulty],
              ["SETS", workout.sets],
              ["REPS", workout.reps],
              ["DURATION", `${workout.duration} min`],
              ["CALORIES", `${workout.caloriesBurned} kcal`],
              ["RATING", workout.rating],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between px-4 py-3 text-sm"
              >
                <span className="text-gray-400">{label}</span>
                <span className="text-white font-medium">{value}</span>
              </div>
            ))}
          </div>

        
          <h2 className="text-white font-bold mt-6 mb-3">INSTRUCTIONS</h2>
          <ol className="space-y-2 text-gray-300 text-sm list-decimal list-inside">
            {workout.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

        
          <div className="flex gap-4 mt-6">
            <button className="bg-lime-400 text-black px-5 py-2.5 rounded-full text-sm font-semibold">
              + Add to today&apos;s plan
            </button>
            <button className="border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-semibold">
              🔖 Save for later
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}