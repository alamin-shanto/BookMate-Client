import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book, BorrowPayload, BorrowResponse } from "../type";

export const libraryApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookmate-server-g43o.onrender.com/api",
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
      transformResponse: (response: { success: boolean; data: Book }) =>
        response.data,
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
      query: ({ bookId, borrowerName, quantity, dueDate }) => ({
        url: `/borrows/${bookId}`,
        method: "POST",
        body: { borrowerName, quantity, dueDate },
      }),
      invalidatesTags: ["Books", "BorrowSummary"],
    }),

    getBorrowSummary: builder.query<
      Array<{
        title: string;
        isbn: string;
        totalQuantity: number;
        bookId: string;
      }>,
      void
    >({
      query: () => "/borrows/summary",
      transformResponse: (response: {
        success: boolean;
        data: Array<{
          title: string;
          isbn: string;
          totalQuantity: number;
          bookId: string;
        }>;
      }) => response.data,
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
