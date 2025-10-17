import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book, BorrowPayload, BorrowResponse } from "../type";

export const libraryApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  }),
  tagTypes: ["Books", "BorrowSummary"],
  endpoints: (builder) => ({
    getBooks: builder.query<
      { items: Book[]; total: number },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => `/books?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ _id }) => ({
                type: "Books" as const,
                id: _id,
              })),
              "Books",
            ]
          : ["Books"],
    }),

    getBook: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Books", id }],
    }),

    createBook: builder.mutation<Book, Partial<Book>>({
      query: (body) => ({ url: "/books", method: "POST", body }),
      invalidatesTags: ["Books"],
    }),

    updateBook: builder.mutation<Book, { id: string; body: Partial<Book> }>({
      query: ({ id, body }) => ({ url: `/books/${id}`, method: "PUT", body }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Books", id }],
    }),

    deleteBook: builder.mutation<void, string>({
      query: (id) => ({ url: `/books/${id}`, method: "DELETE" }),
      invalidatesTags: ["Books"],
    }),

    borrowBook: builder.mutation<BorrowResponse, BorrowPayload>({
      query: ({ bookId, ...body }) => ({
        url: `/borrows/${bookId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Books", "BorrowSummary"],
    }),

    getBorrowSummary: builder.query<
      Array<{ title: string; isbn?: string; totalQuantity: number }>,
      void
    >({
      query: () => "/borrows/summary",
      providesTags: ["BorrowSummary"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = libraryApi;
