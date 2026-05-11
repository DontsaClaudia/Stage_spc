const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    })
  }

  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        error: 'Email manquant'
      })
    }

    // Recherche client Stripe
    const customers = await stripe.customers.list({
      email,
      limit: 1
    })

    const customer = customers.data[0]

    if (!customer) {
      return res.status(404).json({
        error: 'Aucun abonnement trouvé pour cet email'
      })
    }

    // Création portail Stripe
    const portalSession =
      await stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: `${req.headers.origin}/offres`,
      })

    return res.status(200).json({
      url: portalSession.url
    })

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      error: error.message
    })
  }
}