import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useBorrowBookMutation,
  useGetBookQuery,
} from "../features/api/libraryApi";

export default function BorrowBook() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data: book, isLoading: loadingBook } = useGetBookQuery(bookId!);
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const [borrowerName, setBorrowerName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [dueAt, setDueAt] = useState("");

  const handleBorrow = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookId) return alert("Book ID is missing.");
    if (!borrowerName) return alert("Please enter your name.");
    if (!dueAt) return alert("Please select a due date.");

    try {
      await borrowBook({
        bookId,
        borrowerName,
        quantity,
        dueDate: dueAt, // send as dueDate for backend
      }).unwrap();

      alert("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (err) {
      console.error("Borrow request failed:", err);
      alert("Failed to borrow the book. Please try again.");
    }
  };

  if (loadingBook)
    return (
      <div className="flex justify-center items-center min-h-[80vh] text-xl font-semibold text-indigo-600 animate-pulse">
        Loading book details...
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-pink-200">
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          📖 Borrow Book
        </h1>

        {/* Book info */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800">{book?.title}</h2>
          <p className="text-gray-600">{book?.author}</p>
          {book?.genre && (
            <span className="text-sm text-gray-500">{book.genre}</span>
          )}
        </div>

        <form onSubmit={handleBorrow} className="flex flex-col gap-5">
          {/* Borrower name */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/90 text-gray-800 transition-all duration-200"
              required
            />
          </div>

          {/* Quantity input */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              max={book?.copies || 1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/90 text-gray-800 transition-all duration-200"
              required
            />
          </div>

          {/* Due date input */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueAt}
              onChange={(e) => setDueAt(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/90 text-gray-800 transition-all duration-200"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 py-3 text-lg font-semibold rounded-lg text-white shadow-md transition-all duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 via-teal-400 to-emerald-500 hover:scale-[1.02] hover:opacity-90"
            }`}
          >
            {isLoading ? "Processing..." : "Confirm Borrow"}
          </button>
        </form>

        <button
          onClick={() => navigate(-1)}
          className="mt-5 text-sm text-indigo-600 font-medium hover:underline hover:text-pink-500 transition"
        >
          ← Back to Book List
        </button>
      </div>
    </div>
  );
}
