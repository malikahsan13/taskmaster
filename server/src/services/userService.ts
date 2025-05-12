import { AppDataSource } from "../database/connection";
import { User } from "../models/user";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async getAll() {
    return this.userRepository.find();
  }

  async getById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, payload: Partial<User>) {
    await this.userRepository.update(id, payload);
    return this.getById(id);
  }

  async delete(id: number) {
    return this.userRepository.delete(id);
  }

  async updateRole(userId: string, role: "user" | "admin") {
    return await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-password");
  }
}
