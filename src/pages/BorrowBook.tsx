import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBorrowBookMutation } from "../features/api/libraryApi";

export default function BorrowBook() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();

  const handleBorrow = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id || !dueDate) return alert("Please select a due date");

      await borrowBook({
        bookId: id,
        quantity,
        dueDate,
      }).unwrap();

      navigate("/borrow-summary");
    } catch (err) {
      console.error("Failed to borrow book:", err);
      alert("Borrow request failed!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Borrow Book</h1>

      <form onSubmit={handleBorrow} className="space-y-4">
        {/* Quantity input */}
        <div>
          <label className="block font-semibold mb-1">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Due date input */}
        <div>
          <label className="block font-semibold mb-1">Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 disabled:opacity-70"
        >
          {isLoading ? "Processing..." : "Confirm Borrow"}
        </button>
      </form>
    </div>
  );
}
