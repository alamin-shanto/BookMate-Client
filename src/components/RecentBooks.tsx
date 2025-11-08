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

  // Filter + shuffle (kept as you requested)
  const filteredBooks = activeGenre
    ? books.filter((b) => b.genre === activeGenre)
    : books;
  const randomized = [...filteredBooks].sort(() => Math.random() - 0.5);
  const recentBooks = randomized.slice(0, 3);

  return (
    <section className="px-6 py-14 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200 via-transparent to-transparent pointer-events-none" />

      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
        📚 Recent Books
      </h2>

      {/* Genre Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveGenre(null)}
          className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all shadow-sm focus:outline-none focus:ring-4 ${
            activeGenre === null
              ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
              : "bg-white/80 border border-indigo-100 text-indigo-600 hover:bg-indigo-50"
          }`}
          aria-pressed={activeGenre === null}
        >
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre === activeGenre ? null : genre)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all shadow-sm focus:outline-none focus:ring-4 ${
              activeGenre === genre
                ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
                : "bg-white/80 border border-indigo-100 text-indigo-600 hover:bg-indigo-50"
            }`}
            aria-pressed={activeGenre === genre}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {recentBooks.map((book: Book) => (
          <article
            key={book._id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedBook(book)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedBook(book);
              }
            }}
            className="group bg-white/90 rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-pink-200 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-200"
            aria-label={`Open details for ${book.title}`}
          >
            <div className="relative overflow-hidden">
              <img
                src={
                  book.image ||
                  "https://via.placeholder.com/400x250?text=No+Image"
                }
                alt={book.title}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay CTA — visible on mobile and on hover for larger screens */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    // prevent the article onClick from firing twice on button tap
                    e.stopPropagation();
                    setSelectedBook(book);
                  }}
                  aria-label={`View details for ${book.title}`}
                  className="text-white text-sm font-semibold bg-gradient-to-r from-pink-500 to-indigo-500 px-4 py-2 rounded-full shadow-md hover:opacity-90"
                >
                  View Details →
                </button>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{book.genre}</p>
              <p className="text-sm text-gray-600 line-clamp-3">
                {book.description || "No description available."}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* See More */}
      <div className="flex justify-center mt-12">
        <a
          href="/books"
          className="px-8 py-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-[1.03] transition-transform duration-300"
        >
          See All Books →
        </a>
      </div>

      {/* Modal */}
      {selectedBook && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedBook(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Details for ${selectedBook.title}`}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-5xl w-[90%] overflow-hidden flex flex-col md:flex-row transform scale-100 animate-[fadeIn_0.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Info */}
            <div className="flex-1 p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
              <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                {selectedBook.title}
              </h3>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold text-gray-800">Author:</span>{" "}
                  {selectedBook.author}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Genre:</span>{" "}
                  {selectedBook.genre || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">ISBN:</span>{" "}
                  {selectedBook.isbn || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Copies:</span>{" "}
                  {selectedBook.copies || 0}
                </p>
              </div>

              <p className="mt-5 text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
                {selectedBook.description ||
                  "No description available for this book."}
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
                >
                  Close
                </button>
              </div>
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
    </section>
  );
}
