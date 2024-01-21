import { Router, Request, Response } from 'express';
import { ProductRepository } from '../repository/productRepository';
import { ProductModel } from '../adapters/models/product.schema';
import { ProductUsecase } from '../usecases/product.usecase';
import { ProductController } from '../controllers/productController';


export class ProductRouter {
    router = Router();

    constructor() {
        const productRepository = new ProductRepository(ProductModel);
        const productUsecase = new ProductUsecase(productRepository);
        const productController = new ProductController(productUsecase);

        this.router.post('/api/product/add-product', (req: Request, res: Response) => {
            productController.add_Product(req, res);
            // console.log('add product successfully');
            
        });
        this.router.post('/api/product/delete-product', (req: Request, res: Response) => {
            productController.delete_product(req, res);

        });
        this.router.post('/api/product/get-product', (req: Request, res: Response) => {
            productController.get_one_Product(req, res);

        });
        this.router.get('/api/product/get-all-products', (req: Request, res: Response) => {
            productController.get_all_Product(req, res);

        });
    }
}

export const productRouter = new ProductRouter().router;
 