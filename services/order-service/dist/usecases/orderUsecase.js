"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderUsecase = void 0;
class OrderUsecase {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    placeOrder(orderData) {
        return this.orderRepository.placeOrder(orderData);
    }
}
exports.OrderUsecase = OrderUsecase;
