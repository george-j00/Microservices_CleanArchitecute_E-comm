import { UserEntity } from "../entities/user.entity";

interface LoginDTO {
  email: string;
  password: string;
}

export interface IUserCase {
  register(user: UserEntity): Promise<void>;
//   login(credentials: LoginDTO): Promise<string | null>;
  login(email : string , password : string ): Promise<string | null>;

}
