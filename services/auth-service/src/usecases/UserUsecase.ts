import { UserEntity } from "../entities/user.entity";
import { IUserCase } from "../interfaces/iUserUsecase";
import { UserRepository } from "../repositories/userRepository";

export class UserUsecase implements IUserCase {
  constructor(private userRepository: UserRepository) {}

  async register(user: UserEntity): Promise<void> {
    await this.userRepository.register(user);
  }
  async login(email: string, password: string): Promise<string | null> {
    return await this.userRepository.login(email, password);
  }
}
