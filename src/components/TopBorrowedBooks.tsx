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
    <section className="px-6 py-10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-lg mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <TrendingUp className="text-indigo-600 dark:text-indigo-400" />
          Top Borrowed Books
        </h2>
        <a
          href="/borrow-summary"
          className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          View All →
        </a>
      </div>

      {topBooks.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topBooks.map((book, i) => (
            <div
              key={book.bookId}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-gray-400">
                  Rank #{i + 1}
                </span>
                <BookOpen className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 transition-colors duration-300">
                {book.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                {book.isbn ? `ISBN: ${book.isbn}` : "ISBN unavailable"}
              </p>
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(book.totalQuantity * 5, 100)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                  Borrowed{" "}
                  <span className="font-semibold">{book.totalQuantity}</span>{" "}
                  times
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No borrowing data available yet.
        </p>
      )}
    </section>
  );
}
