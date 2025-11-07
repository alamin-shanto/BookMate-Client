import { Link } from "react-router-dom";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "../features/api/libraryApi";
import type { Book } from "../features/type";
import { useState } from "react";

export default function BookList() {
  const { data, isLoading, isError } = useGetBooksQuery({ page: 1, limit: 50 });
  const [deleteBook] = useDeleteBookMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (isLoading)
    return (
      <div className="pt-24 text-center text-indigo-500 font-semibold text-lg animate-pulse">
        Loading books...
      </div>
    );

  if (isError)
    return (
      <div className="pt-24 text-center text-red-500 font-semibold text-lg">
        Failed to load books. Please try again later.
      </div>
    );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      setDeletingId(id);
      await deleteBook(id).unwrap();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
          📚 Book
        </h1>
        <Link
          to="/add-book"
          className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          + Add New Book
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-2xl border border-gray-200 bg-white/80 backdrop-blur-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-indigo-100 to-pink-100">
            <tr>
              {[
                "Title",
                "Author",
                "Genre",
                "ISBN",
                "Copies",
                "Available",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-sm font-bold text-gray-800 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data?.items.map((book: Book, index: number) => (
              <tr
                key={book._id}
                className={`transition hover:shadow-lg hover:scale-[1.01] ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 text-gray-800 font-semibold">
                  {book.title}
                </td>
                <td className="px-6 py-4 text-gray-700">{book.author}</td>
                <td className="px-6 py-4 text-gray-700">{book.genre}</td>
                <td className="px-6 py-4 text-gray-700">{book.isbn}</td>
                <td className="px-6 py-4 text-center text-gray-700">
                  {book.copies}
                </td>
                <td className="px-6 py-4 text-center">
                  {book.available ? (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                      Available
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                      Borrowed
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 flex justify-center gap-3">
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="bg-yellow-400/90 hover:bg-yellow-500 text-gray-900 font-semibold px-3 py-1.5 rounded-md shadow transition-transform transform hover:scale-105"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    disabled={deletingId === book._id}
                    className={`font-semibold px-3 py-1.5 rounded-md shadow transition-transform transform hover:scale-105 ${
                      deletingId === book._id
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    {deletingId === book._id ? "Deleting..." : "Delete"}
                  </button>
                  <Link
                    to={`/borrow-book/${book._id}`}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1.5 rounded-md shadow transition-transform transform hover:scale-105"
                  >
                    Borrow
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Subtle glow effect */}
      <div className="mt-10 text-center text-sm text-gray-500">
        <span className="animate-pulse">
          ✨ Manage your books easily with elegance and speed.
        </span>
      </div>
    </div>
  );
}
