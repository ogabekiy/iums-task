import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

class MailService {
     constructor() {
          this.transporter = nodemailer.createTransport({
               host: process.env.MAIL_HOST,
               port: process.env.MAIL_PORT,
               secure: true,
               auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
               },
          })

     }

     async sendActivationMail(to, activationLink) {
          console.log(to);

          await this.transporter.sendMail({
               from: `"Auth App" <${process.env.MAIL_USER}>`,
               to,
               subject: 'Account Activation',
               html: `
    <div>
      <h3>Assalomu alaykum!</h3>
      <p>Ro‘yxatdan o‘tganingiz uchun rahmat.</p>
      <p>Hisobingizni faollashtirish uchun quyidagi tugmani bosing:</p>
      <p>
        <a href="${activationLink}" target="_blank" style="display:inline-block;padding:10px 15px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px;">
          Akkauntni faollashtirish
        </a>
      </p>
      <p>Agar tugma ishlamasa, quyidagi linkni browserga qo‘ying:</p>
      <p>${activationLink}</p>
    </div>
  `
          });

     }
}

export default MailService
