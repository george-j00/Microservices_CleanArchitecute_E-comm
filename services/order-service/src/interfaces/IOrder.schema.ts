
interface IProduct {
    productId: string;
    productName: string;
    productPrice: number;
}

interface IAddress {
    country: string;
    state:string;
    pin:number;
}

export interface IOrderSchema extends Document {
    userName: string;
    products:IProduct[];
    quantity: number;
    total: number;
    address: IAddress;
}