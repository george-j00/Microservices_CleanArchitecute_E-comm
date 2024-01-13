import jwt from "jsonwebtoken";
import { UserEntity } from "../entities/user.entity";
import { IUserCase } from "../interfaces/iUserUsecase";
import { IUserSchema } from "../interfaces/IUserShema";
import { Model } from "mongoose";
import UserModel  from "../adapters/models/userSchema";

export class UserRepository implements IUserCase {

  private readonly UserModel: Model<IUserSchema>;

  constructor(UserModel: Model<IUserSchema>) {
    this.UserModel = UserModel;
  }

  async register(user: UserEntity): Promise<void> {
    try {
      const newUser = new this.UserModel(user);
    await newUser.save();
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed");
    }
  }

  async login(email: string, password: string): Promise<string | null> {
    try {
      const user = await this.UserModel.findOne({email: email }).exec();

      if (user) {
        const token = this.generateToken(user);
        return token;
      } else {
        return null; 
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed");
    }
  }

  private generateToken(user: UserEntity): string {
    const payload = {
      userId: user.id,
      username: user.name,
      email: user.email,
    };

    const secretKey = "your-secret-key";
    const expiresIn = "1h";

    return jwt.sign(payload, secretKey, { expiresIn });
  }
}
