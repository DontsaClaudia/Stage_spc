const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function getAllowedPriceIds() {
  return new Set(
    [
      process.env.STRIPE_PRICE_GRATUIT,
      process.env.STRIPE_PRICE_SPORTIF,
      process.env.STRIPE_PRICE_COACH_10,
      process.env.STRIPE_PRICE_SELFCHECKS,
    ].filter(Boolean)
  )
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { priceId, offre } = req.body
  const allowedPriceIds = getAllowedPriceIds()

  if (!priceId || !allowedPriceIds.has(priceId)) {
    return res.status(400).json({ error: 'Offre ou prix invalide' })
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
