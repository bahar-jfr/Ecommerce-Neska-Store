export interface IProduct {
  _id: string;
  category: ICategory;
  subcategory: ISubcategory;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  brand: string;
  description: string;
  images: string[];
  comments?: string[];
  rating: { rate: number; count: number };
}

export interface IParams {
  limit?: number;
  page?: number | string;
  discount?: number;
  minPrice?: string;
  maxPrice?: string;
  brand?: string | null;
  category?: string |null;
  subcategory?: string |null;
  sort?:string | null 
}

export interface ICategory {
  _id: string;
  name: string;
  createdAt: string;
  icon: string;
  slugname: string;
  updatedAt: string;
  __v: number;
}

export interface ISubcategory {
  _id: string;
  category: string;
  name: string;
  slugname: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrders {
  _id: string;
  user: IUser;
  products:IOrderProduct[];
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderProduct {
  count: number;
  product: IProduct;
  _id :string
};

export interface IAddOrder{
  user: string;
  products: { product: string; count: string }[];
  deliveryStatus: boolean;
  totalPrice:number
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

export interface UserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

export interface IAddProduct {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  discount: number;
  description: string;
  subcategory: string;
  category: string;
  images?: FileList ;
}


export interface ISignUpSuccess {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export interface ISignUpError {
  status: string;
  message: string;
}