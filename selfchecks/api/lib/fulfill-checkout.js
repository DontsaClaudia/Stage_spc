const Stripe = require('stripe')
const crypto = require('crypto')
const { Resend } = require('resend')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

const PHP_API_URL =
  process.env.PHP_API_URL ||
  'https://recipeboard.alwaysdata.net/app/api_receive_paid_token.php'

const APP_URL =
  process.env.APP_URL || 'https://self-checks.fr'

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

function buildConfirmationEmailHtml({ token, siteUrl, alreadyExists }) {
  const resiliationUrl = siteUrl ? `${siteUrl}/resiliation` : null
  const nextSteps = [
    "Conservez cet email : votre token d'activation figure ci-dessous",
    "Cliquez sur le bouton pour accéder à l'application Self Checks",
    'Créez votre compte avec votre email et votre token',
    'Commencez votre auto-évaluation !',
  ]

  const stepsHtml = nextSteps
    .map(
      (step, i) => `
        <tr>
          <td style="vertical-align:top;padding:6px 12px 6px 0;width:28px">
            <span style="display:inline-block;width:22px;height:22px;background:#e30613;color:#fff;border-radius:50%;text-align:center;line-height:22px;font-size:12px;font-weight:bold">${i + 1}</span>
          </td>
          <td style="vertical-align:top;padding:6px 0;color:#cbd5e1;font-size:14px;line-height:1.5">${step}</td>
        </tr>`
    )
    .join('')

  const alreadyExistsHtml = alreadyExists
    ? `<p style="text-align:center;color:#94a3b8;font-size:13px;margin:0 0 24px">Votre accès était déjà activé. Voici à nouveau votre token.</p>`
    : ''

  return `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Self Checks — Paiement confirmé</title>
  </head>
  <body style="margin:0;padding:0;background:#0f172a;font-family:Arial,Helvetica,sans-serif;color:#f8fafc">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:32px 16px">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px">
            <tr>
              <td align="center" style="padding-bottom:24px">
                <div style="width:72px;height:72px;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.4);border-radius:50%;line-height:72px;font-size:32px;color:#4ade80">&#10003;</div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom:16px">
                <h1 style="margin:0;font-size:28px;font-weight:bold;text-transform:uppercase;letter-spacing:1px">Paiement confirmé !</h1>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom:24px">
                <p style="margin:0;color:#cbd5e1;font-size:15px;line-height:1.7">
                  Merci pour votre abonnement Self Checks. Voici votre token d'activation pour créer votre compte sur l'application.
                </p>
              </td>
            </tr>
            ${alreadyExists ? `<tr><td>${alreadyExistsHtml}</td></tr>` : ''}
            <tr>
              <td style="padding-bottom:28px">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1e293b;border:1px solid rgba(239,68,68,0.3);border-radius:14px;padding:24px">
                  <tr>
                    <td align="center">
                      <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#ef4444">Votre token d'activation</p>
                      <p style="margin:0;font-size:30px;font-weight:bold;letter-spacing:4px;color:#f8fafc">${token}</p>
                      <p style="margin:14px 0 0;color:#cbd5e1;font-size:13px;line-height:1.6">
                        Utilisez ce token avec votre adresse email pour créer votre compte Self Checks.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:28px">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(30,41,59,0.5);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:20px 24px">
                  <tr>
                    <td>
                      <p style="margin:0 0 14px;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#f8fafc">Prochaines étapes</p>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${stepsHtml}</table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom:14px">
                <a href="${APP_URL}" style="display:inline-block;background:#e30613;color:#ffffff;padding:16px 32px;border-radius:6px;text-decoration:none;font-weight:bold;text-transform:uppercase;letter-spacing:1px;font-size:13px">Accéder à l'application</a>
              </td>
            </tr>
            ${
              resiliationUrl
                ? `<tr>
              <td align="center" style="padding-bottom:24px">
                <a href="${resiliationUrl}" style="display:inline-block;background:#1e293b;color:#f8fafc;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:bold;text-transform:uppercase;letter-spacing:1px;font-size:12px;border:1px solid rgba(255,255,255,0.15)">Gérer mon abonnement</a>
              </td>
            </tr>`
                : ''
            }
            <tr>
              <td align="center" style="padding-top:8px;border-top:1px solid rgba(255,255,255,0.08)">
                <p style="margin:16px 0 0;color:#64748b;font-size:12px;line-height:1.6">
                  Vous recevez cet email suite à votre paiement sur Self Checks.<br />
                  Application : <a href="${APP_URL}" style="color:#94a3b8">${APP_URL}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function buildConfirmationEmailText({ token, siteUrl, alreadyExists }) {
  const resiliationUrl = siteUrl ? `${siteUrl}/resiliation` : null
  const lines = [
    'Self Checks — Paiement confirmé !',
    '',
    'Merci pour votre abonnement Self Checks. Voici votre token d\'activation pour créer votre compte sur l\'application.',
    '',
  ]

  if (alreadyExists) {
    lines.push('Votre accès était déjà activé. Voici à nouveau votre token.', '')
  }

  lines.push(
    `Token d'activation : ${token}`,
    '',
    'Utilisez ce token avec votre adresse email pour créer votre compte Self Checks.',
    '',
    'Prochaines étapes :',
    '1. Conservez cet email : votre token d\'activation figure ci-dessus',
    '2. Accédez à l\'application Self Checks',
    '3. Créez votre compte avec votre email et votre token',
    '4. Commencez votre auto-évaluation !',
    '',
    `Accéder à l'application : ${APP_URL}`
  )

  if (resiliationUrl) {
    lines.push(`Gérer mon abonnement : ${resiliationUrl}`)
  }

  lines.push(
    '',
    'Vous recevez cet email suite à votre paiement sur Self Checks.'
  )

  return lines.join('\n')
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

  if (sendEmail && process.env.RESEND_API_KEY) {
    const fromAddress =
      process.env.RESEND_FROM || 'Self Checks <selfchecks@palmierconsulting.click>'
    const replyTo =
      process.env.RESEND_REPLY_TO || 'stephane@palmierconsulting.fr'

    await resend.emails.send({
      from: fromAddress,
      to: email,
      reply_to: replyTo,
      subject: 'Self Checks — Paiement confirmé, votre token d\'activation',
      html: buildConfirmationEmailHtml({ token, siteUrl, alreadyExists }),
      text: buildConfirmationEmailText({ token, siteUrl, alreadyExists }),
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
