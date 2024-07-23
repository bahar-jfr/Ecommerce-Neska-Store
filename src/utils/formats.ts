export function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
    }).format(price);
  }
  