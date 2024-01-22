  import { Document } from "mongoose";

 export interface IShippingAddress {
    district: string;
    state:string;
    pin:number;
  }
  export interface IUserSchema extends Document {
      id: string;
      name: string;
      email: string;
      password: string;
      address:IShippingAddress;
      createdAt: Date;
      updatedAt: Date;
    }
    