import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product, ProductsState, ProductsApiResponse } from "../../types";

const API_URL = "https://dummyjson.com/products";


const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};


export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {

    const response = await axios.get<ProductsApiResponse>(`${API_URL}?limit=0`);
    return response.data.products;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.message || "Failed to fetch products");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      });
  },
});

export default productsSlice.reducer;
