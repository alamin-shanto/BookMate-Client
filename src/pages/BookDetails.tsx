// src/pages/BookDetails.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetBookQuery } from "../features/api/libraryApi";

export default function BookDetails() {
  const params = useParams<{ id?: string }>();
  const id = params.id;
  const navigate = useNavigate();

  // Call hook unconditionally, but skip the request when id is missing.
  const {
    data: book,
    isLoading,
    isError,
    refetch,
  } = useGetBookQuery(id as string, { skip: !id });

  if (!id) {
    return <div className="p-6 text-center text-red-600">Invalid book id.</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg sm:text-xl font-semibold text-indigo-600 animate-pulse">
        Loading book...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600">
        <div className="text-lg font-semibold">❌ Failed to load book.</div>
        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white w-full sm:w-auto"
          >
            Retry
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg border border-gray-200 w-full sm:w-auto"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="p-6 text-center text-gray-700">
        <div className="text-lg">Book not found.</div>
        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white w-full sm:w-auto"
          >
            Go back
          </button>
          <Link
            to="/books"
            className="px-4 py-2 rounded-lg border border-gray-200 text-center w-full sm:w-auto"
          >
            All books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl sm:max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
        {/* Cover */}
        <div className="w-full md:w-[340px] flex-shrink-0">
          <div className="w-full h-[16rem] sm:h-[20rem] md:h-[480px] rounded-lg overflow-hidden border border-gray-200 shadow-md bg-gray-100 flex items-center justify-center">
            <img
              src={
                book?.image ??
                "https://via.placeholder.com/400x600?text=No+Image"
              }
              alt={book?.title ?? "Book cover"}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 leading-tight">
            {book?.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-700 mb-4">
            <span className="font-semibold">Author:</span> {book?.author}
          </p>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="text-xs sm:text-sm text-gray-600 px-3 py-1 rounded-lg bg-gray-50 border border-gray-100">
              <span className="font-medium">Genre:</span>{" "}
              <span className="ml-1">{book?.genre ?? "N/A"}</span>
            </div>

            <div className="text-xs sm:text-sm text-gray-600 px-3 py-1 rounded-lg bg-gray-50 border border-gray-100">
              <span className="font-medium">ISBN:</span>{" "}
              <span className="ml-1">{book?.isbn ?? "N/A"}</span>
            </div>

            <div className="text-xs sm:text-sm text-gray-600 px-3 py-1 rounded-lg bg-gray-50 border border-gray-100">
              <span className="font-medium">Copies:</span>{" "}
              <span className="ml-1">{book?.copies ?? 0}</span>
            </div>

            <div className="text-xs sm:text-sm px-3 py-1 rounded-full border">
              {book?.available ? (
                <span className="font-semibold text-green-700">Available</span>
              ) : (
                <span className="font-semibold text-red-700">Unavailable</span>
              )}
            </div>
          </div>

          <div className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
            {book?.description ?? "No description available for this book."}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Link
              to={`/edit-book/${book?._id}`}
              className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-center w-full sm:w-auto"
            >
              Edit
            </Link>

            <Link
              to={`/borrow/${book?._id}`}
              className="px-4 py-2 rounded-lg bg-green-100 text-green-800 hover:bg-green-200 text-center w-full sm:w-auto"
            >
              Borrow
            </Link>

            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg border border-gray-200 w-full sm:w-auto"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
