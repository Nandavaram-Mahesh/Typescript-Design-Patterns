// --- Validation --- (owned by: business/product team)
class UserValidator {
  validateEmail(email: string): void {
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      throw new Error("Invalid email format");
    }
  }

  validatePassword(password: string): void {
    if (password.length < 8) {
      throw new Error("Password too short");
    }
  }
}

export {UserValidator}