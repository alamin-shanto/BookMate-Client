import { useParams, Link } from "react-router-dom";
import { useGetBookQuery } from "../features/api/libraryApi";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError } = useGetBookQuery(id!);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError || !book)
    return <div className="p-4 text-red-500">Book not found</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>ISBN:</strong> {book.isbn}
      </p>
      <p>
        <strong>Copies:</strong> {book.copies}
      </p>
      <p>
        <strong>Available:</strong> {book.available ? "Yes" : "No"}
      </p>
      <div className="mt-4 flex gap-2">
        <Link
          to={`/edit-book/${book._id}`}
          className="btn bg-yellow-200 px-4 py-2 rounded hover:bg-yellow-300"
        >
          Edit
        </Link>
        <Link
          to="/"
          className="btn bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
