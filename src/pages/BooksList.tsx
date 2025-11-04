import { Link } from "react-router-dom";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "../features/api/libraryApi";
import type { Book } from "../features/type";

export default function BooksList() {
  const { data, isLoading, isError } = useGetBooksQuery({ page: 1, limit: 50 });
  const [deleteBook, { isLoading: deleting }] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl font-semibold text-indigo-600 animate-pulse">
        Loading books...
      </div>
    );

  if (isError)
    return (
      <div className="p-10 text-center text-red-500 text-lg font-semibold">
        ❌ Failed to load books. Please try again later.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
          📚 Library Dashboard
        </h1>

        <Link
          to="/create-book"
          className="mt-4 md:mt-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-7 py-3 rounded-full shadow-lg hover:shadow-pink-300 hover:scale-105 transition-all duration-300"
        >
          + Add New Book
        </Link>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto backdrop-blur-md bg-white/90 border border-gray-200 rounded-2xl shadow-2xl">
        <table className="min-w-full text-sm text-gray-800 rounded-2xl overflow-hidden">
          <thead className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
            <tr>
              {[
                "Cover",
                "Title",
                "Author",
                "Genre",
                "ISBN",
                "Copies",
                "Available",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="p-4 text-left font-semibold tracking-wide uppercase text-xs"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data?.items?.length ? (
              data.items.map((b: Book, i: number) => (
                <tr
                  key={b._id}
                  className={`transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {/* Cover */}
                  <td className="p-3">
                    <div className="w-16 h-20 overflow-hidden rounded-md border border-gray-200 shadow-sm bg-gray-100">
                      {b.image ? (
                        <img
                          src={b.image}
                          alt={b.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex justify-center items-center h-full text-xs text-gray-400 italic">
                          No Image
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Book Info */}
                  <td className="p-4 font-semibold text-gray-900">{b.title}</td>
                  <td className="p-4 text-gray-700">{b.author}</td>
                  <td className="p-4 text-gray-700">{b.genre}</td>
                  <td className="p-4 text-gray-700">{b.isbn}</td>
                  <td className="p-4 text-center">{b.copies}</td>
                  <td className="p-4 text-center">
                    {b.available ? (
                      <span className="px-3 py-1.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full shadow-sm">
                        Available
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 text-xs font-semibold bg-red-100 text-red-700 rounded-full shadow-sm">
                        Borrowed
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex flex-wrap justify-center gap-2">
                      <Link
                        to={`/books/${b._id}`}
                        className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 shadow-sm"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit-book/${b._id}`}
                        className="px-3 py-1.5 rounded-full text-sm bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-all duration-200 shadow-sm"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/borrow/${b._id}`}
                        className="px-3 py-1.5 rounded-full text-sm bg-green-100 text-green-700 hover:bg-green-200 transition-all duration-200 shadow-sm"
                      >
                        Borrow
                      </Link>
                      <button
                        onClick={() => handleDelete(b._id)}
                        disabled={deleting}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium text-white shadow-md transition-all duration-200 ${
                          deleting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90"
                        }`}
                      >
                        {deleting ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="p-8 text-center text-gray-500 font-medium"
                >
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        ✨ A modern and elegant way to manage your library efficiently.
      </div>
    </div>
  );
}
