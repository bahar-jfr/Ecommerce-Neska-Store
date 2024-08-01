import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function fromFormDataToObject(formData: FormData): { [key: string]: string } {
  const obj: { [key: string]: string } = {};

  Array.from(formData.entries()).forEach(([key, value]) => {
    obj[key] = value.toString();
  });

  return obj;
}


export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  }).format(price);
}
