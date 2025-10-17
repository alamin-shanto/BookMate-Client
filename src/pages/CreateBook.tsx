import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../features/api/libraryApi";
import type { Book } from "../features/type";

export default function CreateBook() {
  const [book, setBook] = useState<Partial<Book>>({});
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBook(book as Book);
    navigate("/");
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="title"
          placeholder="Title"
          value={book.title || ""}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={book.author || ""}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="genre"
          placeholder="Genre"
          value={book.genre || ""}
          onChange={handleChange}
          className="input"
        />
        <input
          name="isbn"
          placeholder="ISBN"
          value={book.isbn || ""}
          onChange={handleChange}
          className="input"
        />
        <input
          name="copies"
          type="number"
          placeholder="Copies"
          value={book.copies || ""}
          onChange={handleChange}
          className="input"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
