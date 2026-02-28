import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductItem } from "../../types";
import productsDummy from "../../dummy-data/products.json";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;
const USE_DUMMY = !BASE_URL;

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL ?? "/" }),
  tagTypes: ["Product"],
  endpoints: builder => ({
    getProducts: builder.query<ProductItem[], void>({
      ...(USE_DUMMY
        ? {
            queryFn: () => ({
              data: productsDummy as ProductItem[]
            })
          }
        : { query: () => "/products" }),
      providesTags: ["Product"]
    }),

    getProductById: builder.query<ProductItem, string>({
      ...(USE_DUMMY
        ? {
            queryFn: (productId: string) => {
              const found = (productsDummy as ProductItem[]).find(p => p.productId === productId);
              return found
                ? { data: found }
                : { error: { status: "CUSTOM_ERROR" as const, error: "Product not found" } };
            }
          }
        : { query: (productId: string) => `/products/${productId}` }),
      providesTags: (_result, _error, productId) => [{ type: "Product", id: productId }]
    })
  })
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
