const { stripe, fulfillCheckoutSession } = require('./lib/fulfill-checkout')

module.exports = async (req, res) => {
  const { session_id } = req.query

  if (!session_id) {
    return res.status(400).json({ error: 'session_id manquant' })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    const result = await fulfillCheckoutSession(session, {
      req,
      sendEmail: true,
    })

    return res.status(200).json(result)
  } catch (error) {
    console.error(error)

    const status = error.phpStatus ? 502 : 500

    return res.status(status).json({
      error: error.message || 'Erreur serveur',
    })
  }
}
