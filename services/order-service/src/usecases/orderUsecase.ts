import { IOrderSchema } from "../interfaces/IOrder.schema";
import { IOrderUsecase } from "../interfaces/IOrder.usecase";
import { OrderRepository } from "../repositories/order-repository";


export class OrderUsecase implements IOrderUsecase {

    constructor(private orderRepository: OrderRepository){}

    placeOrder(orderData: IOrderSchema): Promise<void> {
        
        return this.orderRepository.placeOrder(orderData);
    }
}