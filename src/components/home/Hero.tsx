import maorPhoto from "../../assets/maor-cropped.jpg"

export default function Hero() {
  return (
    <div className="animate-glow-pulse relative rounded-3xl bg-gradient-to-br from-cyan-500/50 via-violet-500/40 to-fuchsia-500/50 p-px">
      <div className="relative flex items-center gap-4 overflow-hidden rounded-[calc(1.5rem-1px)] bg-neutral-950 p-4">
        <div className="animate-aurora-1 pointer-events-none absolute -top-16 -right-10 h-48 w-48 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="animate-aurora-2 pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-violet-500/25 blur-3xl" />
        <div className="animate-aurora-3 pointer-events-none absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10 sm:h-32 sm:w-28">
          <img
            src={maorPhoto}
            alt=""
            aria-hidden
            className="animate-ken-burns h-full w-full object-cover object-[50%_20%]"
          />
        </div>

        <div className="relative">
          <h2 className="animate-gradient-shift bg-[length:200%_auto] bg-gradient-to-l from-cyan-300 via-white to-violet-300 bg-clip-text text-lg font-bold text-transparent sm:text-xl">
            מתאמנים היום. נבחרים מחר.
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            תרגול ממוקד לקראת מבחני הקבלה ליחידות מודיעין עילית
          </p>
        </div>
      </div>
    </div>
  )
}
