import { UserEntity } from "../enitity/user.entity";
import { IShippingAddress } from "../interfaces/IUserShema";
import { IUserCase } from "../interfaces/iUserUsecase";
import { UserRepository } from "../repository/userRepository";

export class UserUsecase implements IUserCase{

    constructor(private userRepository:UserRepository ){}

    register(user: UserEntity): Promise<void> {
      return this.userRepository.register(user);
    }
    login(email: string, password: string): Promise<boolean | null> {
        return this.userRepository.login(email, password);
    }
    addAddress(userId : string,address:IShippingAddress): Promise<void>{
      return this.userRepository.addAddress(userId, address);
    }
    deleteAddress(userId : string): Promise<void>{
      return this.userRepository.deleteAddress(userId);
    }

}