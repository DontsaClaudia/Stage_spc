import { useState } from 'react'

export default function Contact() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)
    setStatus('')

    try {

      const response = await fetch('/api/contact_api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l’envoi')
      }

      setStatus('Message envoyé avec succès ✅')

      setForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      })

    } catch (error) {

      setStatus(error.message)

    } finally {

      setLoading(false)
    }
  }

  return (

    <section className="bg-ink flex items-center justify-center px-6 py-24">

      <div className="max-w-4xl w-full rounded-3xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        {/* Partie gauche */}
        <div className="relative min-h-[320px] bg-black/40 p-8 flex flex-col justify-between overflow-hidden">

          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-sc/40 blur-3xl rounded-full" />

          <div className="absolute top-20 right-10 w-48 h-48 bg-white/10 blur-3xl rounded-full" />

          <div className="relative z-10">

            <p className="font-condensed font-bold text-sm tracking-[0.3em] uppercase text-red-sc mb-4">
              Contact
            </p>

            <h1 className="font-condensed font-black text-4xl sm:text-5xl uppercase text-cream leading-none">
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">

            <div>

              <label className="text-xs font-medium text-gray-700">
                Votre nom complet
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                required
                placeholder="Votre nom"
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none"
              />

            </div>

            <div>

              <label className="text-xs font-medium text-gray-700">
                Email
              </label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
                placeholder="email@exemple.com"
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none"
              />

            </div>

            <div>

              <label className="text-xs font-medium text-gray-700">
                Téléphone
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                placeholder="+33"
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none"
              />

            </div>

            <div>

              <label className="text-xs font-medium text-gray-700">
                Message
              </label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="2"
                required
                placeholder="Expliquez-nous votre demande"
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none resize-none"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-1 bg-red-sc hover:bg-red-dark text-white font-condensed font-bold uppercase tracking-widest py-3 rounded-xl transition-all duration-200"
            >
              {loading ? 'Envoi...' : 'Envoyer la demande'}
            </button>

            {status && (
              <p className="text-sm text-center mt-3 text-gray-700">
                {status}
              </p>
            )}

          </form>

        </div>

      </div>

    </section>
  )
}