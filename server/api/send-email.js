import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    const transporter = nodemailer.createTransport({
      host: config.MAIL_SMTP_HOST, 
      port: Number(config.MAIL_SMTP_PORT),
      secure: true,
      auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS,
      },
    })
    const mailOptions = {
      from: config.MAIL_USER,
      to: config.MAIL_USER,
      subject: `Lead - ${body.topic}`,
      text: `
        Name: ${body.name}
        Job Title: ${body.jobTitle}
        Company: ${body.company}
        Email: ${body.email}
        Topic: ${body.topic}
      `,
    }
    await transporter.sendMail(mailOptions)

    return { success: true, message: "Email sent successfully!" }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, message: "Failed to send email." }
  }
})
