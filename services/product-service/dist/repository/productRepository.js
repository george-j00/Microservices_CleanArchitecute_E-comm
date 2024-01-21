"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
class ProductRepository {
    constructor(productModel) {
        this.productModel = productModel;
    }
    add_product(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = new this.productModel(productData);
            yield newProduct.save();
        });
    }
    delete_product(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteProduct = yield this.productModel.findByIdAndDelete(productId);
        });
    }
    getProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productModel.findById(productId);
            return product;
        });
    }
    getAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            const allProduct = yield this.productModel.find();
            return allProduct;
        });
    }
}
exports.ProductRepository = ProductRepository;
