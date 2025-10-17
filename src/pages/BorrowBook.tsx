import { useParams, useNavigate } from "react-router-dom";
import { useBorrowBookMutation } from "../features/api/libraryApi";

export default function BorrowBook() {
  const { id } = useParams<{ id: string }>();
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();

  const handleBorrow = async () => {
    await borrowBook(id!);
    navigate("/borrow-summary");
  };

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Borrow Book</h1>
      <button
        onClick={handleBorrow}
        disabled={isLoading}
        className="btn bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {isLoading ? "Processing..." : "Confirm Borrow"}
      </button>
    </div>
  );
}
