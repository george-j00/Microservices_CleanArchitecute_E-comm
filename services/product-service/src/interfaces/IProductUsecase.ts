import { ProductEntity } from "../entity/product.entity";

export interface IProductUsecase {
    add_product(productData : ProductEntity) : Promise<void>;
    delete_product(productId : string) : Promise<void>;
    getProduct(productId : string) : Promise<ProductEntity>;
    getAllProduct() : Promise<ProductEntity[]>
}