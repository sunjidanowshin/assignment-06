import Image from "next/image";
import { Workout } from "@/types/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
        {/* Category tags — overlaid on image */}
        <div className="absolute top-3 left-3 flex gap-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="bg-lime-400 text-black text-xs font-bold px-2 py-1 rounded-full uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-white font-bold text-lg uppercase">
          {workout.name}
        </h3>
        <p className="text-gray-400 text-sm mb-3">{workout.equipment}</p>

        <div className="border-t border-white/10 pt-3 flex items-center gap-4 text-sm text-gray-400">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>⭐ {workout.rating}</span>
        </div>
      </div>
    </div>
  );
}