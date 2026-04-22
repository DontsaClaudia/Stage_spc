const stats = [
  { number: '30J',  label: 'Essai gratuit' },
  { number: '12',    label: 'Profils — Sportif & Coach' },
  { number: '24/7', label: 'Disponibilité' },
  { number: '100%', label: 'Auto-évaluation' },
]

export default function StatsBand() {
  return (
    // bg-ink/40 : noir semi-transparent comme la navbar
    // backdrop-blur-md : flou derrière pour l'effet verre
    <div className="bg-transparent/90 backdrop-blur-md py-8 flex items-center justify-center gap-6 flex-wrap animate-fadeup-slow">

      {stats.map(({ number, label }, i) => (
        <div key={i} className="flex items-center gap-6">
          <div
            className="bg-red-sc text-white text-center px-8 py-4"
            style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
          >
            <div className="font-condensed font-black text-3xl leading-none">
              {number}
            </div>
            <div className="text-[0.68rem] tracking-widest uppercase opacity-85 mt-1">
              {label}
            </div>
          </div>
          {i < stats.length - 1 && (
            <div className="w-px h-8 bg-white/20" />
          )}
        </div>
      ))}

    </div>
  )
}