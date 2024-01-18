import { UserEntity } from "../enitity/user.entity";
import { IUserCase } from "../interfaces/iUserUsecase";
import { UserRepository } from "../repository/userRepository";

export class UserUsecase implements IUserCase{

    constructor(private userRepository:UserRepository ){}

    register(user: UserEntity): Promise<void> {
      return this.userRepository.register(user);
    }
    login(email: string, password: string): Promise<boolean> {
        return this.userRepository.login(email, password);
    }
    
}