import { useState } from "react";
import { useGetBooksQuery } from "../features/api/libraryApi";
import type { Book } from "../features/type";

export default function RecentBooks() {
  const { data, isLoading } = useGetBooksQuery({});
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-60 text-lg font-semibold text-indigo-500 animate-pulse">
        Loading recent books...
      </div>
    );

  const books = data?.items || [];

  if (books.length === 0)
    return (
      <div className="text-center text-gray-500 py-10 text-lg">
        No books available.
      </div>
    );

  // Unique genres
  const genres = [...new Set(books.map((b) => b.genre || "Unknown"))];

  // Filter by selected genre or show all
  const filteredBooks = activeGenre
    ? books.filter((b) => b.genre === activeGenre)
    : books;

  // Randomize books
  const randomized = [...filteredBooks].sort(() => Math.random() - 0.5);

  // Take first 3 random books
  const recentBooks = randomized.slice(0, 3);

  return (
    <div className="px-6 py-10 bg-gradient-to-b from-purple-50 via-pink-50 to-indigo-100">
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        📚 Recent Books
      </h2>

      {/* Genre Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveGenre(null)}
          className={`px-3 py-1 text-sm border rounded-full shadow-sm transition-all ${
            activeGenre === null
              ? "bg-indigo-500 text-white border-indigo-500"
              : "bg-white/80 text-indigo-600 border-indigo-200 hover:bg-indigo-100"
          }`}
        >
          All
        </button>

        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre === activeGenre ? null : genre)}
            className={`px-3 py-1 text-sm border rounded-full shadow-sm transition-all ${
              activeGenre === genre
                ? "bg-indigo-500 text-white border-indigo-500"
                : "bg-white/80 text-indigo-600 border-indigo-200 hover:bg-indigo-100"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentBooks.map((book: Book) => (
          <div
            key={book._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-pink-200 transition-all duration-300"
          >
            <img
              src={
                book.image ||
                "https://via.placeholder.com/400x250?text=No+Image"
              }
              alt={book.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{book.genre}</p>
              <button
                onClick={() => setSelectedBook(book)}
                className="text-pink-500 text-sm font-medium hover:underline"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* See More */}
      <div className="flex justify-center mt-10">
        <a
          href="/books"
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
        >
          See All Books →
        </a>
      </div>

      {/* Modal */}
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
