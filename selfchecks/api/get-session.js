const Stripe = require('stripe')
const crypto = require('crypto')
const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

module.exports = async (req, res) => {
  const { session_id } = req.query

  if (!session_id) {
    return res.status(400).json({ error: 'session_id manquant' })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)

    const email = (
      session.customer_details?.email ||
      session.customer_email ||
      ''
    ).trim().toLowerCase()

    if (!email) {
      return res.status(400).json({
        error: 'Email introuvable dans la session Stripe'
      })
    }

    const token = crypto
      .createHash('sha256')
      .update(`${email}${session.id}`)
      .digest('hex')
      .substring(0, 16)
      .toUpperCase()

    const phpApiSecret = (process.env.PHP_API_SECRET || '').trim()

    if (!phpApiSecret) {
      return res.status(500).json({
        error: 'PHP_API_SECRET manquant côté site paiement'
      })
    }

    const role =
      (session.metadata?.offre || '').toLowerCase() === 'coach'
        ? 'coach'
        : 'athlete'

    const payload = {
      token,
      email,
      role,
      offre: session.metadata?.offre || null,
      paid: true,
      stripe_session_id: session.id,
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
      console.error('Echec appel API PHP:', {
        status: apiResponse.status,
        body: responseText
      })
    }

    await resend.emails.send({
  from: 'Self Checks <selfchecks@palmierconsulting.click>',
  to: email,
  subject: 'Votre accès Self Checks',
  html: `
    <div style="font-family:Arial,sans-serif;background:#0f172a;padding:40px;color:white">
      
      <div style="max-width:600px;margin:auto;background:#111827;border-radius:16px;padding:40px;border:1px solid rgba(255,255,255,0.08)">
        
        <div style="text-align:center;margin-bottom:30px">
          <div style="width:80px;height:80px;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.4);border-radius:999px;display:flex;align-items:center;justify-content:center;margin:auto">
            <span style="font-size:38px">✓</span>
          </div>
        </div>

        <h1 style="text-align:center;font-size:36px;margin-bottom:20px">
          Paiement confirmé !
        </h1>

        <p style="text-align:center;color:#cbd5e1;line-height:1.7;margin-bottom:35px">
          Merci pour votre abonnement à SelfChecks.
          Votre accès à l'application est maintenant actif.
        </p>

        <div style="background:#1e293b;border:1px solid rgba(239,68,68,0.3);border-radius:14px;padding:25px;text-align:center;margin-bottom:35px">
          <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#ef4444;margin-bottom:10px">
            Votre token d'activation
          </p>

          <p style="font-size:32px;font-weight:bold;letter-spacing:4px;margin:0">
            ${token}
          </p>

          <p style="margin-top:15px;color:#cbd5e1;font-size:13px;line-height:1.6">
            Utilisez ce token avec votre adresse email
            pour créer votre compte Self Checks.
          </p>
        </div>

        <div style="margin-bottom:35px">
          <h3 style="margin-bottom:18px">
            Prochaines étapes
          </h3>

          <ol style="color:#cbd5e1;line-height:2">
            <li>Accédez à l'application Self Checks</li>
            <li>Créez votre compte</li>
            <li>Entrez votre email et votre token</li>
            <li>Commencez votre auto-évaluation</li>
          </ol>
        </div>

        <div style="text-align:center">
          <a
            href="https://recipeboard.alwaysdata.net"
            style="
              display:inline-block;
              background:#ef4444;
              color:white;
              padding:16px 32px;
              border-radius:10px;
              text-decoration:none;
              font-weight:bold;
              text-transform:uppercase;
              letter-spacing:1px;
            "
          >
            Accéder à l'application
          </a>
        </div>

      </div>
    </div>
  `
})
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