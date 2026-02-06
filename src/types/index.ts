
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


export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  subtotal: number;
}


export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}


export interface CartState {
  items: CartItem[];
}


export interface RootState {
  products: ProductsState;
  cart: CartState;
}


export interface ProductsApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
