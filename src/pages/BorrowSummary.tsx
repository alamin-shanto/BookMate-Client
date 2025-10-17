import { useGetBorrowSummaryQuery } from "../features/api/libraryApi";

export default function BorrowSummary() {
  // no generic needed, hook already infers type
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();

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
          {data.map((b, i) => (
            <li key={i}>
              {b.title} — Quantity: {b.totalQuantity}
              {b.isbn && ` (ISBN: ${b.isbn})`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books borrowed yet.</p>
      )}
    </div>
  );
}
