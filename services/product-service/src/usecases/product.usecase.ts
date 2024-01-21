import { ProductEntity } from "../entity/product.entity";
import { IProductUsecase } from "../interfaces/IProductUsecase";
import { ProductRepository } from "../repository/productRepository";

export class ProductUsecase implements IProductUsecase{

    constructor(public productRepository: ProductRepository){}
    
    async add_product(productData: ProductEntity): Promise<void> {
        await this.productRepository.add_product(productData)
    }
    async delete_product(productId: string): Promise<void> {
        await this.productRepository.delete_product(productId)
    }
    async getProduct(productId: string): Promise<ProductEntity | null> {
       return await this.productRepository.getProduct(productId)
    }
    async getAllProduct(): Promise<ProductEntity[]> {
       return await this.productRepository.getAllProduct()
    }
    
}