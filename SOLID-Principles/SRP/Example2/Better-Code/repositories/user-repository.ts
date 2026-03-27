class UserRepository {
  constructor(private db: any) {}

  async findById(userId: number): Promise<User> {
    return await this.db.query(
      `SELECT * FROM users WHERE id = ${userId}`
    );
  }
}

export {UserRepository}