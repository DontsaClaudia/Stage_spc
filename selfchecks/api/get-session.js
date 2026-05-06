const Stripe = require('stripe')
const crypto = require('crypto')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

module.exports = async function handler(req, res) {
  const { session_id } = req.query

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)

    const token = crypto
      .createHash('sha256')
      .update(`${session.customer_email}${session.id}`)
      .digest('hex')
      .substring(0, 16)
      .toUpperCase()

    res.status(200).json({
      email: session.customer_email,
      token: token,
      offre: session.metadata?.offre,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}