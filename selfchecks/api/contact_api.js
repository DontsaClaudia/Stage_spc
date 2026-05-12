const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

module.exports = async (req, res) => {

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    })
  }

  try {

    const {
      name,
      email,
      phone,
      message
    } = req.body

    await resend.emails.send({

      from: 'Self Checks <contact@palmierconsulting.click>',

      //  EMAIL DU Destinataire ou de l'ENTREPRISE
      to: 'dontsaclaudia@gmail.com',

      subject: 'Nouveau message - Self Checks',

      html: `
        <div style="font-family:Arial;padding:30px">

          <h2>Nouveau message de contact</h2>

          <p>
            <strong>Nom :</strong> ${name}
          </p>

          <p>
            <strong>Email :</strong> ${email}
          </p>

          <p>
            <strong>Téléphone :</strong> ${phone}
          </p>

          <p>
            <strong>Message :</strong>
          </p>

          <div style="
            background:#f3f4f6;
            padding:20px;
            border-radius:10px;
            margin-top:10px;
          ">
            ${message}
          </div>

        </div>
      `
    })

    return res.status(200).json({
      success: true
    })

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      error: error.message
    })
  }
}