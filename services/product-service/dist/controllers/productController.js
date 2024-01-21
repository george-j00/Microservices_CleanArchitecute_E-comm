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
exports.ProductController = void 0;
class ProductController {
    constructor(productUsecase) {
        this.productUsecase = productUsecase;
    }
    add_Product(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productData = req.body;
                yield this.productUsecase.add_product(productData);
                res.status(200).send('product added successfully');
            }
            catch (error) {
                res.status(500).send('Error while adding product');
                console.log('Error while adding => ', error);
            }
        });
    }
    delete_product(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { product_id } = req.body;
                yield this.productUsecase.delete_product(product_id);
                res.status(200).send('Product deleted successfully');
            }
            catch (error) {
                res.send("error");
                console.log("Error while deleting => ", error);
            }
        });
    }
    get_one_Product(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { product_id } = req.body;
                const product = yield this.productUsecase.getProduct(product_id);
                res.send(product);
                console.log("Got one Employee ", product);
            }
            catch (error) {
                res.send("error");
                console.log("Error while fetching single employee  => ", error);
            }
        });
    }
    get_all_Product(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allProducts = yield this.productUsecase.getAllProduct();
                res.send(allProducts);
                console.log(allProducts);
            }
            catch (error) {
                res.send("error");
                console.log("Error while fetching all employees => ", error);
            }
        });
    }
}
exports.ProductController = ProductController;
