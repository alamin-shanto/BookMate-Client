import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useBorrowBookMutation,
  useGetBookQuery,
} from "../features/api/libraryApi";
import { toast } from "react-toastify";

// Error type guard
type ApiError = { data?: { message?: string } };
const isApiError = (err: unknown): err is ApiError =>
  typeof err === "object" && err !== null && "data" in err;

export default function BorrowBook() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data: book, isLoading: loadingBook } = useGetBookQuery(bookId!);
  const [borrowBook, { isLoading: borrowing }] = useBorrowBookMutation();

  const [borrowerName, setBorrowerName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const handleBorrow = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookId) {
      toast.error("Book ID is missing.");
      return;
    }

    if (!borrowerName.trim()) {
      toast.warn("Please enter your name.");
      return;
    }

    if (!dueDate) {
      toast.warn("Please select a due date.");
      return;
    }

    if (!book) {
      toast.error("Book data not loaded.");
      return;
    }

    const availableCopies =
      typeof book.copies === "number"
        ? book.copies
        : parseInt(String(book.copies || "0"), 10) || 0;

    if (quantity < 1 || quantity > availableCopies) {
      toast.warn("Invalid quantity.");
      return;
    }

    try {
      await borrowBook({ bookId, borrowerName, quantity, dueDate }).unwrap();
      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (err: unknown) {
      console.error("Borrow request failed:", err);
      if (isApiError(err) && err.data?.message) {
        toast.error(err.data.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to borrow the book. Please try again.");
      }
    }
  };

  if (loadingBook)
    return (
      <div className="flex justify-center items-center min-h-[80vh] text-xl font-semibold text-indigo-600 animate-pulse">
        Loading book details...
      </div>
    );

  if (!book)
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-600">Book not found.</p>
          <button
            onClick={() => navigate("/books")}
            className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow"
          >
            Browse Books
          </button>
        </div>
      </div>
    );

  const availableCopies =
    typeof book.copies === "number"
      ? book.copies
      : parseInt(String(book.copies || "0"), 10) || 0;

  return (
    <div className="flex justify-center items-start min-h-[100vh] bg-gradient-to-tr from-indigo-100 via-purple-50 to-pink-100 py-16 px-4">
      <div className="w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transform transition duration-500 hover:scale-105">
        <div className="flex flex-col md:flex-row">
          {/* Book Image */}
          <div className="md:w-1/3 bg-gradient-to-br from-purple-200 via-pink-100 to-rose-100 flex items-center justify-center p-6">
            <img
              src={
                book.image ||
                "https://via.placeholder.com/400x600?text=No+Image"
              }
              alt={book.title}
              className="rounded-xl shadow-lg w-full object-contain max-h-96"
            />
          </div>

          {/* Book Info & Form */}
          <div className="md:w-2/3 p-8 flex flex-col justify-between">
            {/* Book Info */}
            <div className="mb-6">
              <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                📖 {book.title}
              </h1>
              <div className="flex flex-wrap gap-3 items-center mb-3">
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                  Author: {book.author}
                </span>
                {book.genre && (
                  <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                    Genre: {book.genre}
                  </span>
                )}
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                  Available: {availableCopies}
                </span>
              </div>

              <p className="text-gray-600 text-base leading-relaxed">
                {book.description ||
                  "This book is a must-read! Grab it while copies last. Enhance your knowledge and enjoy an immersive experience."}
              </p>
            </div>

            {/* Borrow Form */}
            <form onSubmit={handleBorrow} className="flex flex-col gap-5">
              <input
                type="text"
                value={borrowerName}
                onChange={(e) => setBorrowerName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition text-gray-800 shadow-sm"
                required
              />

              <input
                type="number"
                min={1}
                max={availableCopies}
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (isNaN(val) || val < 1) setQuantity(1);
                  else if (val > availableCopies) setQuantity(availableCopies);
                  else setQuantity(val);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition text-gray-800 shadow-sm"
                required
              />

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition text-gray-800 shadow-sm"
                required
              />

              <button
                type="submit"
                disabled={borrowing || availableCopies < 1}
                className={`py-3 text-lg font-semibold rounded-xl text-white shadow-md transition-all duration-300 ${
                  borrowing || availableCopies < 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-400 via-teal-400 to-emerald-500 hover:scale-105 hover:opacity-90"
                }`}
              >
                {borrowing ? "Processing..." : "Confirm Borrow"}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-sm text-indigo-600 font-medium hover:underline hover:text-pink-500 transition mt-2"
              >
                ← Back to Book List
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
