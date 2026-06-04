const { stripe, fulfillCheckoutSession } = require('./lib/fulfill-checkout')

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []

    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const webhookSecret = (process.env.STRIPE_WEBHOOK_SECRET || '').trim()

  if (!webhookSecret) {
    return res.status(500).json({ error: 'STRIPE_WEBHOOK_SECRET manquant' })
  }

  const signature = req.headers['stripe-signature']

  if (!signature) {
    return res.status(400).json({ error: 'Signature Stripe manquante' })
  }

  let event

  try {
    let rawBody

    if (Buffer.isBuffer(req.body)) {
      rawBody = req.body
    } else if (typeof req.body === 'string') {
      rawBody = Buffer.from(req.body)
    } else {
      rawBody = await readRawBody(req)
    }

    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (error) {
    console.error('Webhook Stripe invalide:', error.message)
    return res.status(400).json({ error: `Webhook Error: ${error.message}` })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    try {
      await fulfillCheckoutSession(session, {
        siteUrl: (process.env.SITE_URL || '').trim(),
        sendEmail: true,
      })
    } catch (error) {
      console.error('Échec fulfillment webhook:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  return res.status(200).json({ received: true })
}
