"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
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
exports.OrderModel = mongoose_1.default.model("OrderModel", orderSchema);
