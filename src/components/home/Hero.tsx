import maorPhoto from "../../assets/maor-cropped.jpg"

export default function Hero() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-neutral-800/70 bg-neutral-900 p-4 shadow-sm">
      <img
        src={maorPhoto}
        alt=""
        aria-hidden
        className="h-28 w-24 shrink-0 rounded-xl object-cover object-[50%_20%] sm:h-32 sm:w-28"
      />
      <div>
        <h2 className="text-lg font-bold text-white sm:text-xl">מתאמנים היום. נבחרים מחר.</h2>
        <p className="mt-1 text-sm text-neutral-400">
          תרגול ממוקד לקראת מבחני הקבלה ליחידות מודיעין עילית
        </p>
      </div>
    </div>
  )
}
