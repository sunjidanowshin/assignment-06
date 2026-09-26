import Image from "next/image";

export default function Banner() {
  return (
    <section className=" px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto bg-zinc-900 rounded-3xl px-6 md:px-12 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
      
          <div>
            <p className="text-lime-400 text-sm font-semibold tracking-wide mb-3">
              WORKOUT LIBRARY
            </p>

            <h1 className="text-4xl md:text-6xl font-bold uppercase leading-tight mb-4 text-white">
              Train With Intent. Log Every Set.
            </h1>

            <p className="text-gray-400 text-base md:text-lg mb-8 max-w-md">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a href="#library"
              className="inline-flex items-center gap-2 bg-lime-400 text-black px-6 py-3 rounded-full font-semibold text-sm
               hover:bg-lime-300 transition">
        
              BROWSE WORKOUTS
              <span>→</span>
        </a>
          </div>

      
          <div className="relative w-full h-64 md:h-96">
            <Image
              src="/assets/banner.png"
              alt="Workout banner"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}