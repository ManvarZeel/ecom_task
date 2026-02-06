// Product interface from DummyJSON API
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// Cart item interface
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  subtotal: number;
}

// Products state interface
export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

// Cart state interface
export interface CartState {
  items: CartItem[];
}

// Root state interface
export interface RootState {
  products: ProductsState;
  cart: CartState;
}

// API response interface
export interface ProductsApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
