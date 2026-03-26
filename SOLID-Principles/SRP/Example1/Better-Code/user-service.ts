import { EmailService } from "./email-service";
import { LoggingService } from "./logging-service";
import { PasswordHasher } from "./password-hasher";
import { UserRepository } from "./user-repository";
import { UserValidator } from "./user-validator";

// --- Orchestrator --- (owned by: backend/feature team)
class UserService {
  constructor(
    private repo: UserRepository,
    private email: EmailService,
    private logger: LoggingService,
    private hasher: PasswordHasher,
    private validator: UserValidator
  ) {}

  async registerUser(username: string, email: string, password: string) {
    this.validator.validateEmail(email);
    this.validator.validatePassword(password);

    const hashed = this.hasher.hash(password);

    await this.repo.save(username, email, hashed);
    await this.email.sendWelcomeEmail(email, username);
    this.logger.log(`User ${username} registered`);

    return { username, email };
  }

  async deactivateUser(userId: number): Promise<void> {
    await this.repo.deactivate(userId);
    this.logger.log(`User ${userId} deactivated`);
  }
}
