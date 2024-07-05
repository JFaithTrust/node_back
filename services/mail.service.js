const nodeMailer = require('nodemailer');

class MailService{
  constructor() {
    this.transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  async sendMail(email, activationLink) {
    await  this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Activation account link ${process.env.API_URL}`,
      text: '',
      html:
        `
          <div>
            <h1>Click to activate account</h1>
            <a href="${activationLink}">${activationLink}</a>
          </div>
        `
    });
  }
}

module.exports = MailService;