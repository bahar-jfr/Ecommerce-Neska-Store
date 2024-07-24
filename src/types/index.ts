export interface IProduct {
    _id: string;
    category: string;
    subcategory: string;
    name: string;
    price: number;
    quantity: number;
    brand: string;
    description: string;
    images: string[];
    rating: object;
  }
  
  export interface IOrders {
    _id: string,
    user: IUser,
    products: IProduct[],
    totalPrice: number,
    deliveryDate: string,
    deliveryStatus: boolean,
    createdAt: string,
    updatedAt: string
  }
  
  export interface IUser {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    address: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }