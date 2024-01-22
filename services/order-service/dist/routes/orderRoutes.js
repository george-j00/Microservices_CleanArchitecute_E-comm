"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = exports.OrderRouter = void 0;
const express_1 = require("express");
const orderModel_1 = require("../adapters/models/orderModel");
const order_repository_1 = require("../repositories/order-repository");
const orderUsecase_1 = require("../usecases/orderUsecase");
const orderController_1 = require("../controllers/orderController");
class OrderRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        const orderRepository = new order_repository_1.OrderRepository(orderModel_1.OrderModel);
        const orderUsecase = new orderUsecase_1.OrderUsecase(orderRepository);
        const orderController = new orderController_1.OrderController(orderUsecase);
        this.router.post('/api/order/place-order', (req, res) => {
            orderController.place_order(req, res);
        });
    }
}
exports.OrderRouter = OrderRouter;
exports.orderRouter = new OrderRouter().router;
