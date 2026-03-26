// import {nodemailer} from  "nodemailer";

// --- Email sending --- (owned by: email/infra team)
class EmailService {
  private smtpHost: string = "smtp.company.com";
  private smtpPort: number = 587;

  async sendWelcomeEmail(email: string, username: string):Promise<void>{
//     const transporter = nodemailer.createTransport({
//       host: this.smtpHost,
//       port: this.smtpPort,
//     });
//     await transporter.sendMail({
//       from: "no-reply@company.com",
//       to: email,
//       subject: "Welcome to the platform!",
//       text: `Hi ${username}, welcome aboard!`,
//     });
    console.log('sending email')
  }

}

export {EmailService}