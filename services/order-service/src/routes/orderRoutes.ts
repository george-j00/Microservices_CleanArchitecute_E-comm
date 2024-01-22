import { Router, Request, Response } from 'express';
import { OrderModel } from '../adapters/models/orderModel';
import { OrderRepository } from '../repositories/order-repository';
import { OrderUsecase } from '../usecases/orderUsecase';
import { OrderController } from '../controllers/orderController';

export class OrderRouter {
    router = Router();

    constructor() {
        const orderRepository = new OrderRepository(OrderModel);
        const orderUsecase = new OrderUsecase(orderRepository);
        const orderController = new OrderController(orderUsecase);

        this.router.post('/api/order/place-order', (req:Request,res:Response) => {
            orderController.place_order(req, res);
        });
    }
}

export const orderRouter = new OrderRouter().router;
 