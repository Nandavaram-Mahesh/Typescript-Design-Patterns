import  {nodemailer} from "nodemailer";

class EmailService {
  private smtpHost: string = "smtp.company.com";
  private smtpPort: number = 587;

  async sendOrderConfirmation(email: string,username: string,total: number): Promise<void> {
    
    const transporter = nodemailer.createTransport({
      host: this.smtpHost,
      port: this.smtpPort,
    });
    
    await transporter.sendMail({
      from: "orders@company.com",
      to: email,
      subject: "Order Confirmed!",
      text: `Hi ${username}, your order of $${total} has been placed successfully.`,
    });
  }
}

export {EmailService};