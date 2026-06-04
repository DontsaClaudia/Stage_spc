const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function getAllowedPriceIdsFromEnv() {
  return new Set(
    [
      process.env.STRIPE_PRICE_GRATUIT,
      process.env.STRIPE_PRICE_SPORTIF,
      process.env.STRIPE_PRICE_COACH_10,
      process.env.STRIPE_PRICE_SELFCHECKS,
      // Secours si seules les variables Vite ont été copiées sur Vercel
      process.env.VITE_PRICE_GRATUIT,
      process.env.VITE_PRICE_SPORTIF,
      process.env.VITE_PRICE_COACH_10,
      process.env.VITE_PRICE_SELFCHECKS,
    ].filter(Boolean)
  )
}

async function isAllowedPriceId(priceId) {
  const fromEnv = getAllowedPriceIdsFromEnv()

  if (fromEnv.size > 0) {
    return fromEnv.has(priceId)
  }

  // Aucune variable de prix : vérifier directement chez Stripe (évite de bloquer le checkout)
  try {
    const price = await stripe.prices.retrieve(priceId)
    return price.active === true
  } catch {
    return false
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY manquant sur le serveur' })
  }

  const { priceId, offre } = req.body

  if (!priceId) {
    return res.status(400).json({ error: 'Prix manquant' })
  }

  const allowed = await isAllowedPriceId(priceId)

  if (!allowed) {
    return res.status(400).json({
      error:
        'Offre ou prix invalide. Vérifiez les variables STRIPE_PRICE_* (ou VITE_PRICE_*) sur Vercel.',
    })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { offre },
      subscription_data:
        offre === 'Démo Gratuite'
          ? {
              trial_period_days: 30,
            }
          : undefined,
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/offres`,
    })

    res.status(200).json({ url: session.url })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
