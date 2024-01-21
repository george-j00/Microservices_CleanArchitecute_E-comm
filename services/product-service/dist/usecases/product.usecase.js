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
exports.ProductUsecase = void 0;
class ProductUsecase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    add_product(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.add_product(productData);
        });
    }
    delete_product(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.delete_product(productId);
        });
    }
    getProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.getProduct(productId);
        });
    }
    getAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.getAllProduct();
        });
    }
}
exports.ProductUsecase = ProductUsecase;
