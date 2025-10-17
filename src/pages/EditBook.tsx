import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from "../features/api/libraryApi";
import type { Book } from "../features/type";

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const { data: bookData, isLoading } = useGetBookQuery(id!);
  const [updateBook, { isLoading: updating }] = useUpdateBookMutation();
  const [book, setBook] = useState<Partial<Book>>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (bookData) setBook(bookData);
  }, [bookData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook({ id: id!, body: book });

    navigate("/");
  };

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="title"
          value={book.title || ""}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="author"
          value={book.author || ""}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="genre"
          value={book.genre || ""}
          onChange={handleChange}
          className="input"
        />
        <input
          name="isbn"
          value={book.isbn || ""}
          onChange={handleChange}
          className="input"
        />
        <input
          name="copies"
          type="number"
          value={book.copies || ""}
          onChange={handleChange}
          className="input"
        />
        <button
          type="submit"
          disabled={updating}
          className="btn bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          {updating ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
