

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
}
