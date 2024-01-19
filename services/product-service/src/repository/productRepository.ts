import { Model } from "mongoose";
import { ProductEntity } from "../entity/product.entity";
import { IProductSchema } from "../interfaces/IProductSchema";
import { IProductUsecase } from "../interfaces/IProductUsecase";
import { ProductModel } from "../adapters/models/product.schema";

export class ProductRepository implements IProductUsecase{

    constructor(productModel : Model<IProductSchema>){}


    async add_product(productData: ProductEntity): Promise<void> {
        const newProduct = new ProductModel(productData)
        await newProduct.save()
    }
    async delete_product(productId: string): Promise<void> {
       const deleteProduct = await ProductModel.findByIdAndDelete(productId)

    }
   async getProduct(productId: string): Promise<ProductEntity> {
        const product = await ProductModel.findById(productId);
        return product ;
    }
    async getAllProduct(): Promise<ProductEntity[]> {
        const allProduct = await ProductModel.findAll();
    }
    
}