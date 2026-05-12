export default function Contact() {
  return (
    <section className="bg-ink flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl w-full rounded-3xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        {/* Partie gauche */}
        <div className="relative min-h-[320px] bg-black/40 p-8 flex flex-col justify-between overflow-hidden">
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-sc/40 blur-3xl rounded-full" />
          <div className="absolute top-20 right-10 w-48 h-48 bg-white/10 blur-3xl rounded-full" />

          <div className="relative z-10">
            <p className="font-condensed font-bold text-sm tracking-[0.3em] uppercase text-red-sc mb-4">
              Contact
            </p>

            <h1 className="font-condensed font-black text-5xl sm:text-6xl uppercase text-cream leading-none">
              Envoyez-nous <br /> un message
            </h1>
          </div>

          <div className="relative z-10">
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              Une question sur Self Checks, nos offres ou votre abonnement ?
              Remplissez le formulaire, nous vous répondrons rapidement.
            </p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white text-black p-5 sm:p-6 rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
           <form className="flex flex-col gap-3">
            <div>
            <label className="text-xs font-medium text-gray-700">Votre nom complet</label>
            <input
                type="text"
                placeholder="Votre nom"
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none focus:border-red-sc"
            />
            </div>

            <div>
            <label className="text-xs font-medium text-gray-700">Email</label>
            <input
                type="email"
                placeholder="email@exemple.com"
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none focus:border-red-sc"
            />
            </div>

            <div>
            <label className="text-xs font-medium text-gray-700">Téléphone</label>
            <input
                type="tel"
                placeholder="+33"
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none focus:border-red-sc"
            />
            </div>

            <div>
            <label className="text-xs font-medium text-gray-700">Message</label>
            <textarea
                rows="3"
                placeholder="Expliquez-nous votre demande"
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none resize-none focus:border-red-sc"
            />
            </div>

            <button
            type="submit"
            className="mt-1 bg-red-sc hover:bg-red-dark text-white font-condensed font-bold uppercase tracking-widest py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
            Envoyer la demande
            </button>
        </form>
        </div>
      </div>
    </section>
  )
}