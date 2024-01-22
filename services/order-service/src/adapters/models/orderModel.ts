import mongoose, { Model } from "mongoose";
import { IOrderSchema } from "../../interfaces/IOrder.schema";

const orderSchema = new mongoose.Schema<IOrderSchema>({
  userName: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      productPrice: { type: Number, required: true },
    },
  ],
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  address: {
    country: { type: String, required: true },
    state: { type: String, required: true },
    pin: { type: Number, required: true },
  },
});

export const OrderModel: Model<IOrderSchema> = mongoose.model<IOrderSchema>( "OrderModel",orderSchema);
