const Stripe = require('stripe')
const crypto = require('crypto')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

module.exports = async (req, res) => {
  const { session_id } = req.query

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)

    const email =
      session.customer_details?.email || session.customer_email

    const token = crypto
      .createHash('sha256')
      .update(`${email}${session.id}`)
      .digest('hex')
      .substring(0, 16)
      .toUpperCase()

    // ✅ ENVOI À L'API PHP
const apiResponse = await fetch(
  'https://recipeboard.alwaysdata.net/app/api_receive_paid_token.php',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PHP_API_SECRET}`
    },
    body: JSON.stringify({
      token,
      email,
      role:
        session.metadata?.offre === 'Coach'
          ? 'coach'
          : 'athlete',

      stripe_session_id: session.id,

      offre: session.metadata?.offre,
      source_site: 'Self Checks'
    })
  }
)

console.log('PHP API status:', apiResponse.status)

    // ✅ réponse vers ton frontend
    res.status(200).json({
      email,
      token,
      offre: session.metadata?.offre
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: error.message
    })
  }
}