import { useGetBorrowedBooksQuery } from "../features/api/libraryApi";
import type { Book } from "../features/type";

export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowedBooksQuery<Book[]>();

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)
    return (
      <div className="p-4 text-red-500">Failed to load borrowed books.</div>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Borrowed Books</h1>
      {data?.length ? (
        <ul className="list-disc pl-5">
          {data.map((b) => (
            <li key={b._id}>
              {b.title} by {b.author}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books borrowed yet.</p>
      )}
    </div>
  );
}
