import { UserRepository } from "./user-repository";

// --- Report formatting --- (owned by: reporting/frontend team)
class UserReportService {
  constructor(private repo: UserRepository) {}

  async getUserReport(userId: number): Promise<string> {
    const user = await this.repo.findById(userId);
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
}
export {UserReportService}