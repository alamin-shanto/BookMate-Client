import React from "react";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "../features/api/libraryApi";
import { Link } from "react-router-dom";

export default function BooksList() {
  const { data, isLoading } = useGetBooksQuery({ page: 1, limit: 50 });
  const [deleteBook] = useDeleteBookMutation();

  if (isLoading) return <div className="p-4">Loading...</div>;
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">All Books</h1>
        <Link to="/create-book" className="btn">
          Add Book
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Copies</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((b) => (
              <tr key={b._id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.genre}</td>
                <td>{b.isbn}</td>
                <td>{b.copies}</td>
                <td>{b.available ? "Yes" : "No"}</td>
                <td className="flex gap-2">
                  <Link to={`/books/${b._id}`} className="btn">
                    View
                  </Link>
                  <Link to={`/edit-book/${b._id}`} className="btn">
                    Edit
                  </Link>
                  <Link to={`/borrow/${b._id}`} className="btn">
                    Borrow
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm("Delete book?")) deleteBook(b._id);
                    }}
                    className="btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
