import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import ProductDetail from "../components/products/ProductDetail";
import LoadingSpinner from "../components/common/LoadingSpinner";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items: products, loading } = useAppSelector(
    (state) => state.products,
  );


  const product = products.find((p) => p.id === Number(id));

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }


  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The product you're looking for doesn't exist or may have been
            removed.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => navigate(-1)} className="btn-secondary">
              Go Back
            </button>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/products" className="hover:text-gray-900 transition-colors">
          Products
        </Link>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="text-gray-900 truncate max-w-xs">{product.title}</span>
      </nav>


      <ProductDetail product={product} />


      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailPage;
