const Stripe = require('stripe')
const crypto = require('crypto')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

module.exports = async (req, res) => {
  const { session_id } = req.query

  if (!session_id) {
    return res.status(400).json({ error: 'session_id manquant' })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)

    const email = (session.customer_details?.email || session.customer_email || '').trim().toLowerCase()
    if (!email) {
      return res.status(400).json({ error: 'Email introuvable dans la session Stripe' })
    }

    const token = crypto
      .createHash('sha256')
      .update(`${email}${session.id}`)
      .digest('hex')
      .substring(0, 16)
      .toUpperCase()

    const phpApiSecret = (process.env.PHP_API_SECRET || '').trim()
    if (!phpApiSecret) {
      return res.status(500).json({ error: 'PHP_API_SECRET manquant côté site paiement' })
    }

    // Choix du rôle selon metadata.offre
    const role =
      (session.metadata?.offre || '').toLowerCase() === 'coach'
        ? 'coach'
        : 'athlete'

    const payload = {
      token,
      email,
      role,
      stripe_session_id: session.id,
      offre: session.metadata?.offre || null,
      source_site: 'Self Checks'
    }

    const apiResponse = await fetch(
      'https://recipeboard.alwaysdata.net/app/api_receive_paid_token.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${phpApiSecret}`
        },
        body: JSON.stringify(payload)
      }
    )

    const responseText = await apiResponse.text()
    console.log('PHP API status:', apiResponse.status)
    console.log('PHP API body:', responseText)

    if (!apiResponse.ok) {
      return res.status(502).json({
        error: 'Echec appel API PHP',
        php_status: apiResponse.status,
        php_body: responseText
      })
    }

    // Réponse frontend
    return res.status(200).json({
      email,
      token,
      offre: session.metadata?.offre || null
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: error.message || 'Erreur serveur'
    })
  }
}