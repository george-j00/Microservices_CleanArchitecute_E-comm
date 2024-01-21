"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    product_name: {
        type: String,
        required: true,
        unique: true,
    },
    product_price: {
        type: Number,
        required: true,
    },
});
exports.ProductModel = mongoose_1.default.model("ProductModel", productSchema);
