import { Link } from "react-router-dom";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "../features/api/libraryApi";
import type { Book } from "../features/type";

export default function BooksList() {
  const { data, isLoading, isError } = useGetBooksQuery({ page: 1, limit: 50 });
  const [deleteBook, { isLoading: deleting }] = useDeleteBookMutation();

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)
    return (
      <div className="p-4 text-red-500 font-semibold">
        Failed to load books.
      </div>
    );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Books</h1>
        <Link
          to="/create-book"
          className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Book
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Author</th>
              <th className="p-3 border">Genre</th>
              <th className="p-3 border">ISBN</th>
              <th className="p-3 border">Copies</th>
              <th className="p-3 border">Available</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.length ? (
              data.items.map((b: Book) => (
                <tr
                  key={b._id}
                  className="text-center border-t hover:bg-gray-50"
                >
                  <td className="p-2 border">{b.title}</td>
                  <td className="p-2 border">{b.author}</td>
                  <td className="p-2 border">{b.genre}</td>
                  <td className="p-2 border">{b.isbn}</td>
                  <td className="p-2 border">{b.copies}</td>
                  <td className="p-2 border">{b.available ? "Yes" : "No"}</td>
                  <td className="p-2 border flex justify-center gap-2">
                    <Link
                      to={`/books/${b._id}`}
                      className="btn bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-book/${b._id}`}
                      className="btn bg-yellow-200 px-2 py-1 rounded hover:bg-yellow-300"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/borrow/${b._id}`}
                      className="btn bg-green-200 px-2 py-1 rounded hover:bg-green-300"
                    >
                      Borrow
                    </Link>
                    <button
                      onClick={() => handleDelete(b._id)}
                      disabled={deleting}
                      className="btn bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50 hover:bg-red-600"
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="p-4 text-center text-gray-500 font-medium"
                >
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
