// --- DB access --- (owned by: backend/db team)
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  active: boolean;
  createdAt: string;
}

class UserRepository {
  constructor(private db: any) {}

  async save(username: string, email: string, hashedPassword: string): Promise<void> {
    await this.db.query(
      `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`
    );
  }

  async deactivate(userId: number): Promise<void> {
    await this.db.query(
      `UPDATE users SET active = 0 WHERE id = ${userId}`
    );
  }

  async findById(userId: number): Promise<User> {
    return await this.db.query(
      `SELECT * FROM users WHERE id = ${userId}`
    );
  }
}

export {UserRepository};