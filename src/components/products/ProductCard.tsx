import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { formatPrice, truncateText } from "../../utils/formatters";
import { useCart } from "../../hooks/useCart";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart, isInCart, getCartItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);
    addToCart(product);

    const cartItem = getCartItem(product.id);
    const newQty = cartItem ? cartItem.quantity + 1 : 1;

    toast.success(
      `${product.title} ${cartItem ? `(${newQty})` : "added to cart"}`,
      {
        duration: 2000,
        icon: "🛒",
      },
    );

    setTimeout(() => setIsAdding(false), 500);
  };

  const inCart = isInCart(product.id);
  const cartItem = getCartItem(product.id);

  return (
    <Link
      to={`/products/${product.id}`}
      className="card group cursor-pointer flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {/* Discount Badge */}
        {product.discountPercentage > 10 && (
          <span className="absolute top-3 left-3 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-lg shadow-lg">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        {/* Rating Badge */}
        <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium text-gray-800 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm flex items-center gap-1">
          <svg
            className="w-3 h-3 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          {product.rating.toFixed(1)}
        </span>
        {/* In Cart Indicator */}
        {inCart && (
          <span className="absolute bottom-3 right-3 px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-lg shadow-lg">
            In Cart ({cartItem?.quantity})
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category */}
        <span className="text-xs font-medium text-primary-600 uppercase tracking-wide mb-1">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {truncateText(product.title, 50)}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4 mt-auto">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.discountPercentage > 10 && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(
                product.price / (1 - product.discountPercentage / 100),
              )}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-2.5 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            isAdding
              ? "bg-green-500 text-white"
              : inCart
                ? "bg-primary-100 text-primary-700 hover:bg-primary-200"
                : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
          }`}
        >
          {isAdding ? (
            <>
              <svg
                className="w-5 h-5 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Added!
            </>
          ) : inCart ? (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add More
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
