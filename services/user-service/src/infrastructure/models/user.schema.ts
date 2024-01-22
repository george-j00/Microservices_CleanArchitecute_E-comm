import mongoose, { Model } from "mongoose";
import { IUserSchema } from "../../interfaces/IUserShema";

const userSchema = new mongoose.Schema<IUserSchema>({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address:{
    district:{ type: String },
    state:{ type: String },
    pin:{ type: Number },
  }
});

export const UserModel: Model<IUserSchema> = mongoose.model<IUserSchema>(
  "UserModel",
  userSchema
);
