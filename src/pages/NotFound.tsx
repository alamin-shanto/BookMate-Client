import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl w-full bg-white/95 rounded-3xl shadow-2xl border border-gray-200 overflow-hidden grid md:grid-cols-2">
        {/* Illustration */}
        <div className="p-10 bg-gradient-to-br from-indigo-600 to-pink-500 text-white flex items-center justify-center">
          <div className="space-y-6 text-center">
            <svg
              className="w-36 h-36 mx-auto opacity-90"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <rect
                x="6"
                y="14"
                width="108"
                height="80"
                rx="10"
                fill="white"
                opacity="0.08"
              />
              <path
                d="M30 80V28l30-8 30 8v52"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M45 40h30"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M45 52h30"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <h1 className="text-4xl font-extrabold">404 — Page Not Found</h1>
            <p className="text-white/90 max-w-sm mx-auto">
              The route you’re looking for doesn’t exist. Maybe the link is old
              or someone mistyped the address.
            </p>
          </div>
        </div>

        {/* Content / Actions */}
        <div className="p-10 flex flex-col justify-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Let’s get you back on track
            </h2>
            <p className="text-gray-600">
              Try returning home or head to the full book list to continue
              browsing.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate("/")}
              className="px-5 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow hover:scale-[1.02] transition"
            >
              Go Home
            </button>

            <button
              onClick={() => navigate("/books")}
              className="px-5 py-3 rounded-full bg-white border border-gray-200 text-gray-800 font-semibold shadow hover:scale-[1.02] transition"
            >
              View All Books
            </button>

            <button
              onClick={() => navigate(-1)}
              className="px-4 py-3 rounded-full text-sm text-gray-500 hover:underline"
            >
              ← Go Back
            </button>
          </div>

          <div className="text-xs text-gray-400 mt-4">
            Tip: If you followed a link from another site, try searching the
            title from the homepage.
          </div>
        </div>
      </div>
    </main>
  );
}
