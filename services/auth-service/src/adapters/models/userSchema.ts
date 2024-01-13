import mongoose, { Schema, Model } from 'mongoose';
import { IUserSchema } from '../../interfaces/IUserShema';

const userSchema = new Schema<IUserSchema>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel:Model<IUserSchema> = mongoose.model<IUserSchema>('Users', userSchema);

export default UserModel;