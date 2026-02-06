/**
 * Format price as USD currency
 * @param price - Number to format
 * @returns Formatted price string (e.g., "$19.99")
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Calculate discount price based on original price and discount percentage
 * @param price - Original price
 * @param discountPercentage - Discount percentage
 * @returns Discounted price
 */
export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number,
): number => {
  return price - (price * discountPercentage) / 100;
};

/**
 * Truncate text to specified length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncating
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

/**
 * Calculate star rating display (e.g., "4.5 out of 5")
 * @param rating - Rating value
 * @returns Star rating string
 */
export const formatRating = (rating: number): string => {
  return `${rating.toFixed(1)} out of 5`;
};

/**
 * Calculate total cart items count
 * @param items - Cart items array
 * @returns Total quantity of all items
 */
export const calculateCartItemsCount = (
  items: { quantity: number }[],
): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Calculate cart subtotal
 * @param items - Cart items array
 * @returns Total price of all items
 */
export const calculateCartSubtotal = (
  items: { subtotal: number }[],
): number => {
  return items.reduce((total, item) => total + item.subtotal, 0);
};
