const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { session_id } = req.body

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: `${req.headers.origin}/offres`,
    })

    return res.status(200).json({ url: portalSession.url })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}