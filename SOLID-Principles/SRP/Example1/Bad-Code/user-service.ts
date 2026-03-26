// ❌ BAD CODE - Single class doing everything
import {nodemailer} from "nodemailer";
import {fs} from "fs";
import {crypto} from "crypto";

class UserService {
  private dbConnection: any;
  private smtpHost: string = "smtp.company.com";
  private smtpPort: number = 587;

  constructor(dbConnection: any) {
    this.dbConnection = dbConnection;
  }

  // --- User business logic ---
  async registerUser(username: string, email: string, password: string) {
    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email format");
    }

    if (password.length < 8) {
      throw new Error("Password too short");
    }

    const hashed = this.hashPassword(password);
    const user = { username, email, password: hashed };

    await this.dbConnection.query(
      `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hashed}')`
    );

    await this.sendWelcomeEmail(email, username);
    this.logToFile(`User ${username} registered at ${this.getTimestamp()}`);

    return user;
  }

  async deactivateUser(userId: number) {
    await this.dbConnection.query(
      `UPDATE users SET active = 0 WHERE id = ${userId}`
    );
    this.logToFile(`User ${userId} deactivated at ${this.getTimestamp()}`);
  }

  async getUserReport(userId: number) {
    const user = await this.dbConnection.query(
      `SELECT * FROM users WHERE id = ${userId}`
    );

    return `
      ========== USER REPORT ==========
      ID       : ${user.id}
      Username : ${user.username}
      Email    : ${user.email}
      Status   : ${user.active ? "Active" : "Inactive"}
      Joined   : ${user.createdAt}
      =================================
    `;
  }

  // --- Email logic ---
  private async sendWelcomeEmail(email: string, username: string) {
    
    const transporter = nodemailer.createTransport({
      host: this.smtpHost,
      port: this.smtpPort,
    });
    await transporter.sendMail({
      from: "no-reply@company.com",
      to: email,
      subject: "Welcome to the platform!",
      text: `Hi ${username}, welcome aboard!`,
    });
  }

  // --- Logging logic ---
  private logToFile(message: string) {
   
    fs.appendFileSync("app.log", `[${this.getTimestamp()}] ${message}\n`);
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  // --- Password logic ---
  private hashPassword(password: string): string {
    
    return crypto.createHash("sha256").update(password).digest("hex");
  }

  // --- Validation logic ---
  private isValidEmail(email: string): boolean {
    return /^[^@]+@[^@]+\.[^@]+$/.test(email);
  }
}