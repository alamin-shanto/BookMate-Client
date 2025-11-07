import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "../features/api/libraryApi";
import type { Book } from "../features/type";

export default function BooksList() {
  const { data, isLoading, isError } = useGetBooksQuery({ page: 1, limit: 50 });
  const [deleteBook, { isLoading: deleting }] = useDeleteBookMutation();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

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
    <div className="max-w-7xl mx-auto px-6 py-24 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
          📚 Book Management
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
                        Unavailable
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => setSelectedBook(b)}
                        className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 shadow-sm"
                      >
                        View
                      </button>
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

      {/* Book Details Modal */}
      {selectedBook && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-5xl w-[90%] overflow-hidden flex flex-col md:flex-row animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Info */}
            <div className="flex-1 p-8 bg-gradient-to-br from-indigo-50 to-pink-50">
              <h3 className="text-3xl font-bold mb-3 text-indigo-600">
                {selectedBook.title}
              </h3>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold text-gray-700">Author:</span>{" "}
                {selectedBook.author}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold text-gray-700">Genre:</span>{" "}
                {selectedBook.genre || "N/A"}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold text-gray-700">ISBN:</span>{" "}
                {selectedBook.isbn || "N/A"}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold text-gray-700">Copies:</span>{" "}
                {selectedBook.copies || 0}
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed">
                {selectedBook.description ||
                  "No description available for this book."}
              </p>

              <button
                onClick={() => setSelectedBook(null)}
                className="mt-6 bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
              >
                Close
              </button>
            </div>

            {/* Right: Image */}
            <div className="flex-1 flex items-center justify-center bg-white p-4">
              <img
                src={
                  selectedBook.image ||
                  "https://via.placeholder.com/400x600?text=No+Image"
                }
                alt={selectedBook.title}
                className="max-h-[500px] w-auto rounded-lg shadow-md object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
