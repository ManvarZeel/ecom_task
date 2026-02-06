
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};


export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number,
): number => {
  return price - (price * discountPercentage) / 100;
};


export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};


export const formatRating = (rating: number): string => {
  return `${rating.toFixed(1)} out of 5`;
};


export const calculateCartItemsCount = (
  items: { quantity: number }[],
): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};


export const calculateCartSubtotal = (
  items: { subtotal: number }[],
): number => {
  return items.reduce((total, item) => total + item.subtotal, 0);
};
