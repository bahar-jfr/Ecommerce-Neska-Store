export interface IProduct {
  _id: string;
  category: ICategory;
  subcategory: ISubcategory;
  name: string;
  price: number;
  discount:number;
  quantity: number;
  brand: string;
  description: string;
  images: string[];
  rating: {rate:number,count:number};
}

interface ICategory {
  _id: string;
  createdAt: string;
  icon: string;
  name: string;
  slugname: string;
  updatedAt: string;
  __v: number;
}

interface ISubcategory {
  _id: string;
  category: string;
  name: string;
  slugname:string;
  createdAt: string;
  updatedAt: string;
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