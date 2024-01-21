import { Request, Response } from "express";
import { ProductUsecase } from "../usecases/product.usecase";
import { ProductEntity } from "../entity/product.entity";

export class ProductController {

  private readonly productUsecase: ProductUsecase;

  constructor(productUsecase: ProductUsecase) {
    this.productUsecase = productUsecase;
  }

  async add_Product(req: Request, res: Response) {
    try {
        const productData: ProductEntity = req.body;
        await this.productUsecase.add_product(productData);
        res.status(200).send('product added successfully');
    } catch (error) {
        res.status(500).send('Error while adding product');
        console.log('Error while adding => ', error);
    }
}

  async delete_product(req: Request, res: Response) {
    try {
      const { product_id } = req.body;
      await this.productUsecase.delete_product(product_id);
      res.status(200).send('Product deleted successfully');
    } catch (error) {
      res.send("error");
      console.log("Error while deleting => ", error);
    }
  }

  async get_one_Product(req: Request, res: Response) {
    try {
      const { product_id } = req.body;
      const product = await this.productUsecase.getProduct(product_id);
      res.send(product);
      console.log("Got one Employee ", product);
    } catch (error) {
      res.send("error");
      console.log("Error while fetching single employee  => ", error);
    }
  }

  async get_all_Product(req: Request, res: Response) {
    try {
      const allProducts = await this.productUsecase.getAllProduct();
      res.send(allProducts);
      console.log(allProducts);
    } catch (error) {
      res.send("error");
      console.log("Error while fetching all employees => ", error);
    }
  }

}
