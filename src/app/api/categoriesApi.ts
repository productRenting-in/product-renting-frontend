import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category } from "../../types";
import categoriesDummy from "../../dummy-data/categories.json";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;
const USE_DUMMY = !BASE_URL;

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL ?? "/" }),
  tagTypes: ["Category"],
  endpoints: builder => ({
    getCategories: builder.query<Category[], void>({
      ...(USE_DUMMY
        ? {
            queryFn: () => ({
              data: categoriesDummy as Category[]
            })
          }
        : { query: () => "/categories" }),
      providesTags: ["Category"]
    }),

    getCategoryById: builder.query<Category, string>({
      ...(USE_DUMMY
        ? {
            queryFn: (categoryId: string) => {
              const found = (categoriesDummy as Category[]).find(c => c.categoryId === categoryId);
              return found
                ? { data: found }
                : { error: { status: "CUSTOM_ERROR" as const, error: "Category not found" } };
            }
          }
        : { query: (categoryId: string) => `/categories/${categoryId}` }),
      providesTags: (_result, _error, categoryId) => [{ type: "Category", id: categoryId }]
    })
  })
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoriesApi;
