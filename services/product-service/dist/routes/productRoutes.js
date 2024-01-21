"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = exports.ProductRouter = void 0;
const express_1 = require("express");
const productRepository_1 = require("../repository/productRepository");
const product_schema_1 = require("../adapters/models/product.schema");
const product_usecase_1 = require("../usecases/product.usecase");
const productController_1 = require("../controllers/productController");
class ProductRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        const productRepository = new productRepository_1.ProductRepository(product_schema_1.ProductModel);
        const productUsecase = new product_usecase_1.ProductUsecase(productRepository);
        const productController = new productController_1.ProductController(productUsecase);
        this.router.post('/api/product/add-product', (req, res) => {
            productController.add_Product(req, res);
            // console.log('add product successfully');
        });
        this.router.post('/api/product/delete-product', (req, res) => {
            productController.delete_product(req, res);
        });
        this.router.post('/api/product/get-product', (req, res) => {
            productController.get_one_Product(req, res);
        });
        this.router.get('/api/product/get-all-products', (req, res) => {
            productController.get_all_Product(req, res);
        });
    }
}
exports.ProductRouter = ProductRouter;
exports.productRouter = new ProductRouter().router;
