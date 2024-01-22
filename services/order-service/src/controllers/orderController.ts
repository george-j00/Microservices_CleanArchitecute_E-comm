import { OrderUsecase } from "../usecases/orderUsecase";
import { Request, Response } from 'express';

export class OrderController {

    constructor(private orderUsecase : OrderUsecase){}

    async place_order(req: Request, res: Response){
        try {
            // const { productId } = req.body
        const orderData = req.body
        // console.log(orderData);
        
         return this.orderUsecase.placeOrder(orderData)
        } catch (error) {
            console.log(error);
        }
    }   
}