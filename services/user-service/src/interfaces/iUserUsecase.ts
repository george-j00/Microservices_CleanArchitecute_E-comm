import { UserEntity } from "../enitity/user.entity";

export interface IUserCase {
  register(user: UserEntity): Promise<void>;
  login(email : string , password : string ): Promise<boolean>;
}
