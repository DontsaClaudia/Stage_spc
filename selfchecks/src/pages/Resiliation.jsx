import { useState } from 'react'

export default function Resiliation() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/create-portal-session-by-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la récupération de l’abonnement')
      }

      window.location.href = data.url
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-ink flex items-center justify-center px-6 pt-24">
      <div className="max-w-md w-full bg-navy border border-white/10 rounded-xl p-8 text-center">
        <h1 className="font-condensed font-black text-4xl uppercase text-cream mb-4">
          Résiliation
        </h1>

        <p className="text-muted text-sm mb-8">
          Entrez l’adresse email utilisée lors du paiement pour gérer ou résilier votre abonnement.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-md bg-white text-black outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-red-sc hover:bg-red-dark text-white font-condensed font-bold uppercase tracking-widest px-6 py-3 rounded-md transition-all disabled:opacity-60"
          >
            {loading ? 'Chargement...' : 'Gérer / résilier'}
          </button>
        </form>

        {message && (
          <p className="text-red-400 text-sm mt-5">
            {message}
          </p>
        )}
      </div>
    </section>
  )
}