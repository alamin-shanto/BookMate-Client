import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBookQuery,
  useUpdateBookMutation,
  useGetBooksQuery,
} from "../features/api/libraryApi";
import type { Book } from "../features/type";

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: bookData, isLoading: fetchingBook } = useGetBookQuery(id!);
  const { data: allBooks } = useGetBooksQuery({ page: 1, limit: 50 });
  const [updateBook, { isLoading: updating }] = useUpdateBookMutation();

  const [book, setBook] = useState<Book | null>(null);

  // set book when data arrives
  useEffect(() => {
    if (bookData) {
      const parsed = (bookData as { data?: Book }).data ?? (bookData as Book);
      setBook(parsed);
    }
  }, [bookData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (!book) return;
    setBook((prev) => ({
      ...prev!,
      [name]:
        type === "checkbox"
          ? checked
          : name === "copies"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;
    await updateBook({ id: id!, body: book }).unwrap();
    navigate("/");
  };

  if (fetchingBook || !book) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl font-semibold text-indigo-600 animate-pulse">
        Loading book details...
      </div>
    );
  }

  const genres = Array.from(
    new Set(allBooks?.items?.map((b: Book) => b.genre).filter(Boolean) ?? [])
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-4 py-10">
      <div className="w-full max-w-xl backdrop-blur-lg bg-white/80 border border-gray-200 rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          ✏️ Edit Book
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {[
            { label: "Title", name: "title", type: "text" },
            { label: "Author", name: "author", type: "text" },
            { label: "ISBN", name: "isbn", type: "text" },
            { label: "Copies", name: "copies", type: "number" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-1">
                {field.label}
              </label>
              <input
                name={field.name}
                type={field.type}
                value={
                  typeof book[field.name as keyof Book] === "boolean"
                    ? book[field.name as keyof Book]
                      ? "true"
                      : "false"
                    : (book[field.name as keyof Book] as
                        | string
                        | number
                        | undefined) ?? ""
                }
                onChange={handleChange}
                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/90 text-gray-800"
                required={["title", "author"].includes(field.name)}
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">
              Genre
            </label>
            <select
              name="genre"
              value={book.genre}
              onChange={handleChange}
              className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/90 text-gray-800"
              required
            >
              <option value="">Select genre</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={book.description ?? ""}
              onChange={handleChange}
              className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/90 text-gray-800"
              rows={4}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">
              Image URL
            </label>
            <input
              name="image"
              type="text"
              value={book.image ?? ""}
              onChange={handleChange}
              className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/90 text-gray-800"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={book.available ?? false}
              onChange={handleChange}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="text-gray-700 text-sm">Available</label>
          </div>

          <button
            type="submit"
            disabled={updating}
            className={`mt-4 py-3 text-lg font-semibold rounded-lg text-white ${
              updating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 hover:opacity-90 hover:scale-[1.02]"
            }`}
          >
            {updating ? "Updating..." : "Update Book"}
          </button>
        </form>

        <button
          onClick={() => navigate(-1)}
          className="mt-5 text-sm text-indigo-600 font-medium hover:underline hover:text-pink-500"
        >
          ← Back to Book List
        </button>
      </div>
    </div>
  );
}
