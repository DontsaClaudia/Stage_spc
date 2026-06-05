import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'

const inputClass =
  'mt-1 w-full rounded-xl border border-white/10 bg-white/5 text-cream placeholder:text-muted/60 px-4 py-2.5 outline-none focus:border-red-sc/50 focus:ring-1 focus:ring-red-sc/30 transition-colors'

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [statusOk, setStatusOk] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setStatus('')
    setStatusOk(false)

    try {
      const response = await fetch('/api/contact_api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t('contact.error'))
      }

      setStatus(t('contact.success'))
      setStatusOk(true)

      setForm({
        name: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (error) {
      setStatus(error.message)
      setStatusOk(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-ink flex items-center justify-center px-6 py-24 min-h-[calc(100vh-5rem)]">
      <div className="max-w-4xl w-full rounded-3xl bg-navy/40 border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[280px] lg:min-h-[420px] bg-ink/80 p-8 flex flex-col justify-between overflow-hidden">
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-sc/30 blur-3xl rounded-full" />
          <div className="absolute top-20 right-10 w-48 h-48 bg-white/5 blur-3xl rounded-full" />

          <div className="relative z-10">
            <p className="font-condensed font-bold text-sm tracking-[0.3em] uppercase text-red-sc mb-4">
              {t('contact.label')}
            </p>
            <h1 className="font-condensed font-black text-4xl sm:text-5xl uppercase text-cream leading-none">
              {t('contact.title')}
            </h1>
          </div>

          <div className="relative z-10">
            <p className="text-muted text-sm leading-relaxed max-w-sm">{t('contact.intro')}</p>
          </div>
        </div>

        <div className="bg-ink/60 border-t lg:border-t-0 lg:border-l border-white/10 p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium text-muted uppercase tracking-wider">
                {t('contact.nameLabel')}
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                required
                placeholder={t('contact.namePlaceholder')}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted uppercase tracking-wider">
                {t('contact.emailLabel')}
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
                placeholder={t('contact.emailPlaceholder')}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted uppercase tracking-wider">
                {t('contact.phoneLabel')}
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                placeholder={t('contact.phonePlaceholder')}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted uppercase tracking-wider">
                {t('contact.messageLabel')}
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                required
                placeholder={t('contact.messagePlaceholder')}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-1 clip-skew bg-red-sc hover:bg-red-dark disabled:opacity-60 text-white font-condensed font-bold uppercase tracking-widest py-3.5 transition-all duration-200 hover:-translate-y-0.5"
            >
              {loading ? t('contact.submitting') : t('contact.submit')}
            </button>

            {status && (
              <p
                className={`text-sm text-center mt-2 flex items-center justify-center gap-2 ${
                  statusOk ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {statusOk && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
