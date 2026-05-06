import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

export default function Success() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    // On récupère les détails de la session pour afficher le token
    if (sessionId) {
      fetch(`/api/get-session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setSession(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [sessionId])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 bg-ink pt-24">

      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-sc border-t-transparent rounded-full animate-spin" />
          <p className="text-muted text-sm tracking-widest uppercase">Confirmation en cours...</p>
        </div>
      ) : (
        <div className="max-w-lg">
          {/* Icône succès */}
          <div className="w-20 h-20 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-10 h-10 text-green-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h1 className="font-condensed font-black text-4xl uppercase text-cream mb-4">
            Paiement confirmé !
          </h1>

          <p className="text-muted text-sm leading-relaxed mb-8">
            Merci pour votre abonnement Self Checks. Vous allez recevoir un email avec votre token d'activation pour créer votre compte sur l'application.
          </p>

          {/* Token affiché */}
          {session?.token && (
            <div className="bg-navy border border-red-sc/30 rounded-xl p-6 mb-8">
              <p className="text-[0.7rem] tracking-widest uppercase text-red-sc mb-2">
                Votre token d'activation
              </p>
              <p className="font-condensed font-black text-2xl text-cream tracking-widest">
                {session.token}
              </p>
              <p className="text-muted text-xs mt-3 leading-relaxed">
                Ce token vous a également été envoyé par email. Utilisez-le avec votre adresse email pour créer votre compte sur l'application Self Checks.
              </p>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-navy/50 border border-white/10 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-condensed font-bold text-sm uppercase tracking-widest text-cream mb-4">
              Prochaines étapes
            </h3>
            <ol className="flex flex-col gap-3">
              {[
                'Vérifiez votre email pour votre token d\'activation',
                'Téléchargez l\'application Self Checks',
                'Créez votre compte avec votre email et votre token',
                'Commencez votre auto-évaluation !',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted">
                  <span className="w-5 h-5 min-w-[1.25rem] bg-red-sc rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <Link
            to="/"
            className="inline-block bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-200 no-underline hover:-translate-y-0.5"
          >
            Retour à l'accueil
          </Link>
        </div>
      )}
    </section>
  )
}
