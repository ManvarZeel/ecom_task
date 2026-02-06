import React, { useState } from "react";
import type { Product } from "../../types";
import { formatPrice } from "../../utils/formatters";
import { useCart } from "../../hooks/useCart";
import toast from "react-hot-toast";

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart, isInCart, getCartItem } = useCart();

  const images =
    product.images?.length > 0 ? product.images : [product.thumbnail];
  const inCart = isInCart(product.id);
  const cartItem = getCartItem(product.id);

  const handleIncrement = () => {
    if (quantity < Math.min(10, product.stock)) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);

    toast.success(`Added ${quantity} ${product.title} to cart`, {
      duration: 3000,
      icon: "🛒",
    });

    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-xl">
          <img
            src={images[selectedImage]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? "border-primary-500 shadow-lg"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        {/* Category & Brand */}
        <div className="flex items-center gap-2 mb-2">
          <span className="badge-primary">{product.category}</span>
          {product.brand && (
            <span className="badge bg-gray-100 text-gray-700">
              {product.brand}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {product.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300 fill-current"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating.toFixed(1)} out of 5
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-4xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.discountPercentage > 10 && (
            <>
              <span className="text-xl text-gray-400 line-through">
                {formatPrice(
                  product.price / (1 - product.discountPercentage / 100),
                )}
              </span>
              <span className="px-2 py-1 text-sm font-bold text-white bg-red-500 rounded-lg">
                -{Math.round(product.discountPercentage)}%
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Stock Status */}
        <div className="flex items-center gap-2 mb-6">
          <span
            className={`w-2 h-2 rounded-full ${
              product.stock > 10
                ? "bg-green-500"
                : product.stock > 0
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
          />
          <span className="text-sm text-gray-600">
            {product.stock > 10
              ? "In Stock"
              : product.stock > 0
                ? `Only ${product.stock} left`
                : "Out of Stock"}
          </span>
        </div>

        {/* In Cart Indicator */}
        {inCart && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl mb-6">
            <p className="text-green-700 font-medium flex items-center gap-2">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {cartItem?.quantity} already in your cart
            </p>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-medium text-gray-700">Quantity:</span>
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
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
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span className="w-16 h-12 flex items-center justify-center font-semibold text-gray-900 border-x border-gray-200">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= Math.min(10, product.stock)}
              className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase quantity"
            >
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
            </button>
          </div>
          <span className="text-sm text-gray-500">
            Max: {Math.min(10, product.stock)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || product.stock === 0}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
            isAdding
              ? "bg-green-500 text-white"
              : product.stock === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "btn-primary"
          }`}
        >
          {isAdding ? (
            <>
              <svg
                className="w-6 h-6 animate-bounce"
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
              Added to Cart!
            </>
          ) : product.stock === 0 ? (
            "Out of Stock"
          ) : (
            <>
              <svg
                className="w-6 h-6"
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
              Add {quantity} to Cart — {formatPrice(product.price * quantity)}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
