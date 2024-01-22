import jwt from "jsonwebtoken";
import { IUserCase } from "../interfaces/iUserUsecase";
import { IShippingAddress, IUserSchema } from "../interfaces/IUserShema";
import { Model } from "mongoose";
import { UserEntity } from "../enitity/user.entity";

export class UserRepository implements IUserCase {
  private readonly UserModel: Model<IUserSchema>;

  constructor(UserModel: Model<IUserSchema>) {
    this.UserModel = UserModel;
  }

  async register(user: UserEntity): Promise<void> {
    try {
      console.log("user repo" , user);
      
      const newUser = new this.UserModel(user);
      await newUser.save();
      console.log(newUser);
      
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed");
    }
  }

  async login(email: string, password: string): Promise<boolean | null> {
    try {
      const user = await this.UserModel.findOne({ email: email }).exec();

      if (user && user.password === password) {
        console.log('login successful');
        return true;
      } 
      else{
        console.log('login failed'); 
        return null; 
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed");
    }
  }
  async addAddress(userId : string , address: IShippingAddress): Promise<void> {
    try {
      const newUser =  await this.UserModel.findByIdAndUpdate({_id:userId} , {$set: {address: address}} , {new:true} );
      console.log(newUser);
    } catch (error) {
      console.error("can't add address:", error);
      throw new Error("can't add address");
    }
  }
  async deleteAddress(userId : string): Promise<void> {
    try {
      await this.UserModel.findByIdAndUpdate({_id:userId} , {$set: {address:{}}}).exec();
    } catch (error) {
      console.error("Can't delete address:", error);
      throw new Error("Can't delete address");
    }
  }


}
