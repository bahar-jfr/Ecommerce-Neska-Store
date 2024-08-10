import { IUser } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductData {
  productId: string;
  count: number;
  discount: number;
  price: number;
}

interface CartState {
  products: ProductData[];
  totalPrice: number;
  originalTotalPrice: number;
  addProduct: (
    productId: string,
    count: number,
    discount: number,
    price: number
  ) => void;
  removeProduct: (productId: string) => void;
  updateCount: (productId: string, count: number) => void;
  updateTotalPrice: (newTotalPrice: number) => void;
  updateOriginalTotalPrice: (newOriginalTotalPrice: number) => void;
}

const calculateFinalPrice = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      products: [],
      totalPrice: 0,
      originalTotalPrice: 0,
      addProduct: (productId, count, discount, price) =>
        set((state) => {
          const newProduct = { productId, count, discount, price };
          const newProducts = [...state.products, newProduct];
          const newTotalPrice = newProducts.reduce(
            (acc, product) =>
              acc +
              calculateFinalPrice(product.price, product.discount) *
                product.count,
            0
          );
          return {
            products: newProducts,
            totalPrice: newTotalPrice,
            originalTotalPrice: newTotalPrice,
          };
        }),
      removeProduct: (productId) =>
        set((state) => {
          const newProducts = state.products.filter(
            (product) => product.productId !== productId
          );
          const newTotalPrice = newProducts.reduce(
            (acc, product) =>
              acc +
              calculateFinalPrice(product.price, product.discount) *
                product.count,
            0
          );
          return {
            products: newProducts,
            totalPrice: newTotalPrice,
            originalTotalPrice: newTotalPrice,
          };
        }),
      updateCount: (productId, count) =>
        set((state) => {
          const newProducts = state.products.map((product) =>
            product.productId === productId ? { ...product, count } : product
          );
          const newTotalPrice = newProducts.reduce(
            (acc, product) =>
              acc +
              calculateFinalPrice(product.price, product.discount) *
                product.count,
            0
          );
          return {
            products: newProducts,
            totalPrice: newTotalPrice,
            originalTotalPrice: newTotalPrice,
          };
        }),
      updateTotalPrice: (newTotalPrice) =>
        set((state) => ({ ...state, totalPrice: newTotalPrice })),
      updateOriginalTotalPrice: (newOriginalTotalPrice) =>
        set((state) => ({
          ...state,
          originalTotalPrice: newOriginalTotalPrice,
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);

interface UserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

export const useUserStore = create(
  persist(
    (set) =>
      ({
        user: null,
        setUser: (user: IUser) => set({ user }),
      } as UserState),
    {
      name: "user-storage",
    }
  )
);
