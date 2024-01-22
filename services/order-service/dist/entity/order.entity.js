"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
class ProductEntity {
    constructor(product_id, user_id, order_id, total, quantity, address) {
        this.product_id = product_id;
        this.user_id = user_id;
        this.order_id = order_id;
        this.total = total;
        this.quantity = quantity;
        this.address = address;
    }
}
exports.ProductEntity = ProductEntity;
