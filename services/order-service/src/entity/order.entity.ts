export class ProductEntity {

    public readonly order_id?: string; 
    public readonly user_id: string;
    public readonly product_id: string;
    public readonly total: number;
    public readonly quantity: number;
    public readonly address: any;
    
    constructor(product_id : string , user_id : string , order_id : string , total : number , quantity : number , address:any) {
            this.product_id = product_id;
            this.user_id = user_id;
            this.order_id = order_id;   
            this.total = total;
            this.quantity = quantity;
            this.address = address;
    }
}

