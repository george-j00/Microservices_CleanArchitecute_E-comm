import { Model } from "mongoose";
import { IOrderSchema } from "../interfaces/IOrder.schema";
import { IOrderUsecase } from "../interfaces/IOrder.usecase";


export class OrderRepository implements IOrderUsecase {

    constructor (public orderUserModel : Model<IOrderSchema> ){}

    async placeOrder(orderData: IOrderSchema): Promise<void> {
        const newOrder = new this.orderUserModel(orderData);
        await newOrder.save().then(() => console.log('order placed'))
        console.log(newOrder);
    }
}