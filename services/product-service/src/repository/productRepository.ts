import { Model } from "mongoose";
import { ProductEntity } from "../entity/product.entity";
import { IProductSchema } from "../interfaces/IProductSchema";
import { IProductUsecase } from "../interfaces/IProductUsecase";

export class ProductRepository implements IProductUsecase{

    constructor(public productModel : Model<IProductSchema>){}


    async add_product(productData: ProductEntity): Promise<void> {
        const newProduct = new this.productModel(productData)
        await newProduct.save()
    }
    async delete_product(productId: string): Promise<void> {
       const deleteProduct = await this.productModel.findByIdAndDelete(productId)

    }
   async getProduct(productId: string): Promise<ProductEntity | null> {
        const product = await this.productModel.findById(productId);
        return product ;
    }
    async getAllProduct(): Promise<ProductEntity[]> {
        const allProduct = await this.productModel.find();
        return allProduct;
    }
    
}