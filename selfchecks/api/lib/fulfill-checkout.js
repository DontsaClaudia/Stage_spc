const Stripe = require('stripe')
const crypto = require('crypto')
const { Resend } = require('resend')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

const PHP_API_URL =
  process.env.PHP_API_URL ||
  'https://recipeboard.alwaysdata.net/app/api_receive_paid_token.php'

const APP_URL =
  process.env.APP_URL || 'https://recipeboard.alwaysdata.net'

function buildToken(email, sessionId) {
  return crypto
    .createHash('sha256')
    .update(`${email}${sessionId}`)
    .digest('hex')
    .substring(0, 16)
    .toUpperCase()
}

function resolveRole(offre) {
  return (offre || '').toLowerCase() === 'coach' ? 'coach' : 'athlete'
}

function siteBaseUrl(req, explicitUrl) {
  const fromEnv = (process.env.SITE_URL || '').trim().replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (explicitUrl) return explicitUrl.replace(/\/$/, '')
  const origin = (req?.headers?.origin || '').trim()
  if (origin) return origin.replace(/\/$/, '')
  return ''
}

function buildConfirmationEmailHtml({ token, siteUrl }) {
  const resiliationUrl = siteUrl ? `${siteUrl}/resiliation` : '/resiliation'

  return `
    <div style="font-family:Arial,sans-serif;background:#0f172a;padding:40px;color:white">
      <div style="max-width:600px;margin:auto;background:#111827;border-radius:16px;padding:40px;border:1px solid rgba(255,255,255,0.08)">
        <div style="text-align:center;margin-bottom:30px">
          <div style="width:80px;height:80px;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.4);border-radius:999px;display:flex;align-items:center;justify-content:center;margin:auto">
            <span style="font-size:38px">✓</span>
          </div>
        </div>
        <h1 style="text-align:center;font-size:36px;margin-bottom:20px">Paiement confirmé !</h1>
        <p style="text-align:center;color:#cbd5e1;line-height:1.7;margin-bottom:35px">
          Merci pour votre abonnement à SelfChecks. Votre accès à l'application est maintenant actif.
        </p>
        <div style="background:#1e293b;border:1px solid rgba(239,68,68,0.3);border-radius:14px;padding:25px;text-align:center;margin-bottom:35px">
          <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#ef4444;margin-bottom:10px">
            Votre token d'activation
          </p>
          <p style="font-size:32px;font-weight:bold;letter-spacing:4px;margin:0">${token}</p>
          <p style="margin-top:15px;color:#cbd5e1;font-size:13px;line-height:1.6">
            Utilisez ce token avec votre adresse email pour créer votre compte Self Checks.
          </p>
        </div>
        <div style="text-align:center">
          <a href="${APP_URL}" style="display:inline-block;background:#ef4444;color:white;padding:16px 32px;border-radius:10px;text-decoration:none;font-weight:bold;text-transform:uppercase;letter-spacing:1px">
            Accéder à l'application
          </a>
        </div>
        <div style="text-align:center;margin-top:16px">
          <a href="${resiliationUrl}" style="display:inline-block;background:#111827;color:white;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:bold;text-transform:uppercase;letter-spacing:1px">
            Gérer ou résilier mon abonnement
          </a>
        </div>
      </div>
    </div>
  `
}

async function syncTokenToPhp(payload, phpApiSecret) {
  const apiResponse = await fetch(PHP_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${phpApiSecret}`,
    },
    body: JSON.stringify(payload),
  })

  const responseText = await apiResponse.text()
  let body = null

  try {
    body = JSON.parse(responseText)
  } catch {
    body = { raw: responseText }
  }

  return { ok: apiResponse.ok, status: apiResponse.status, body }
}

async function fulfillCheckoutSession(session, options = {}) {
  const { req, siteUrl: explicitSiteUrl, sendEmail = true } = options

  const validPaymentStatuses = ['paid', 'no_payment_required']
  if (
    session.payment_status &&
    !validPaymentStatuses.includes(session.payment_status)
  ) {
    throw new Error('Paiement non confirmé')
  }

  const email = (
    session.customer_details?.email ||
    session.customer_email ||
    ''
  )
    .trim()
    .toLowerCase()

  if (!email) {
    throw new Error('Email introuvable dans la session Stripe')
  }

  const token = buildToken(email, session.id)
  const phpApiSecret = (process.env.PHP_API_SECRET || '').trim()

  if (!phpApiSecret) {
    throw new Error('PHP_API_SECRET manquant côté site paiement')
  }

  const role = resolveRole(session.metadata?.offre)
  const payload = {
    token,
    email,
    role,
    offre: session.metadata?.offre || null,
    paid: true,
    stripe_session_id: session.id,
    source_site: 'Self Checks',
  }

  const phpResult = await syncTokenToPhp(payload, phpApiSecret)

  if (!phpResult.ok) {
    const err = new Error(
      phpResult.body?.error || `Échec synchronisation PHP (${phpResult.status})`
    )
    err.phpStatus = phpResult.status
    throw err
  }

  const alreadyExists = Boolean(phpResult.body?.already_exists)
  const siteUrl = siteBaseUrl(req, explicitSiteUrl)

  if (sendEmail && !alreadyExists && process.env.RESEND_API_KEY) {
    await resend.emails.send({
      from: 'Self Checks <selfchecks@palmierconsulting.click>',
      to: email,
      subject: 'Votre accès Self Checks',
      html: buildConfirmationEmailHtml({ token, siteUrl }),
    })
  }

  return {
    email,
    token,
    offre: session.metadata?.offre || null,
    alreadyExists,
  }
}

module.exports = {
  stripe,
  buildToken,
  fulfillCheckoutSession,
  siteBaseUrl,
}
