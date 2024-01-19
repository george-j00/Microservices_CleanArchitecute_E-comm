import { ProductEntity } from "../entity/product.entity";
import { IProductUsecase } from "../interfaces/IProductUsecase";

export class ProductUsecase implements IProductUsecase{

    constructor(productRepository: ProductRepository){}
    
    add_product(productData: ProductEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete_product(productId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getProduct(productId: string): Promise<ProductEntity> {
        throw new Error("Method not implemented.");
    }
    getAllProduct(): Promise<ProductEntity[]> {
        throw new Error("Method not implemented.");
    }
    
}