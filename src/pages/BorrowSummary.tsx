import { useGetBorrowSummaryQuery } from "../features/api/libraryApi";

export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 border-opacity-75" />
      </div>
    );

  if (isError)
    return (
      <div className="p-6 text-center text-red-500 font-semibold bg-red-50 rounded-xl">
        Failed to load borrowed books.
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Borrowed Books Summary
      </h1>

      {data?.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((b, i) => (
            <div
              key={i}
              className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl border border-gray-100 p-5 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {b.title}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  Quantity Borrowed:{" "}
                  <span className="font-medium text-indigo-600">
                    {b.totalQuantity}
                  </span>
                </p>
                {b.isbn && (
                  <p className="text-xs text-gray-500">ISBN: {b.isbn}</p>
                )}
              </div>
              <div className="mt-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-500"
                    style={{
                      width: `${Math.min(b.totalQuantity * 2, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No books borrowed yet.
        </p>
      )}
    </div>
  );
}
