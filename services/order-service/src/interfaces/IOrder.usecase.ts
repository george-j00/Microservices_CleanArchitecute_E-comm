import { IOrderSchema } from "./IOrder.schema";

export interface IOrderUsecase {
    placeOrder (orderData :IOrderSchema ) : Promise<void>;
}