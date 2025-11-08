import { useGetBorrowSummaryQuery } from "../features/api/libraryApi";
import { BookOpen, TrendingUp } from "lucide-react";

export default function TopBorrowedBooks() {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();

  if (isLoading)
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Loading top borrowed books...
      </div>
    );

  if (isError)
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load top borrowed books.
      </div>
    );

  const topBooks = data?.slice(0, 3) || [];

  return (
    <section className="px-6 py-14 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 rounded-3xl shadow-xl mt-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-200 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          <TrendingUp className="text-indigo-600" />
          Top Borrowed Books
        </h2>
        <a
          href="/borrow-summary"
          className="text-indigo-600 hover:underline font-medium"
        >
          View Summary →
        </a>
      </div>

      {topBooks.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topBooks.map((book, i) => (
            <div
              key={book.bookId}
              className="group relative bg-white/95 rounded-2xl border border-gray-100 shadow-md p-6 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl focus-within:ring-4 focus-within:ring-indigo-100"
              aria-label={`Top borrowed: ${book.title}`}
            >
              {/* Rank badge (polished) */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md animate-[pulse_2s_infinite]">
                #{i + 1}
              </div>

              <div className="flex items-center justify-between mb-3">
                <BookOpen className="text-indigo-500" />
                <span className="text-sm font-semibold text-gray-400">
                  Borrow Count
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                {book.title}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {book.isbn ? `ISBN: ${book.isbn}` : "ISBN unavailable"}
              </p>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(book.totalQuantity * 5, 100)}%`,
                    }}
                  />
                </div>
                <p className="text-sm mt-2 text-gray-600">
                  Borrowed{" "}
                  <span className="font-semibold text-gray-800">
                    {book.totalQuantity}
                  </span>{" "}
                  times
                </p>
              </div>

              {/* Decorative overlay (no backdrop-blur — keeps text sharp) */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-pink-600/6 via-indigo-600/6 to-transparent rounded-2xl" />
                <div className="absolute inset-0 pointer-events-none rounded-2xl ring-0 group-hover:ring-8 group-hover:ring-pink-50 transition-all duration-300" />
              </div>

              {/* Floating label (moved so it doesn't blur text) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-white font-semibold text-sm px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 shadow-lg">
                  A reader’s favorite ❤️
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No borrowing data available yet.
        </p>
      )}
    </section>
  );
}
