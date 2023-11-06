import { AuthRepository } from "../repositories/auth.repository";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  async findUser(username: string) {
    return await this.authRepository.findUser(username);
  }
  async createUser(username: string, password: string) {
    return await this.authRepository.createUser(username, password);
  }
}
