import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "All Books", to: "/books" },
  { label: "Add Book", to: "/create-book" },
  { label: "Borrow Summary", to: "/borrow-summary" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const doSearch = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    navigate(`/books?search=${encodeURIComponent(trimmed)}`);
    setOpen(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(query);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="backdrop-blur-xl bg-gradient-to-r from-gray-900/65 via-indigo-900/55 to-gray-900/65 border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 transform transition-all duration-300 hover:scale-105"
              aria-label="BookMate home"
            >
              <div className="flex items-center gap-2">
                <img
                  src="/BookMate Logo.png"
                  alt="BookMate Logo"
                  className="h-10 w-auto md:h-11 object-contain drop-shadow-lg"
                  loading="lazy"
                />
                <span className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                  BookMate
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `relative font-semibold text-lg transition group ${
                        isActive
                          ? "text-white"
                          : "text-white/90 hover:text-white"
                      }`
                    }
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-indigo-400 transition-all duration-300 group-hover:w-full" />
                  </NavLink>
                ))}
              </div>

              {/* Search (desktop) */}
              <form
                onSubmit={onSubmit}
                className="ml-4 hidden lg:flex items-center bg-white/5 rounded-full px-2 py-1 border border-white/5"
                role="search"
                aria-label="Search books"
              >
                <input
                  aria-label="Search books"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent placeholder:text-white/60 text-white px-3 py-2 outline-none w-44"
                  placeholder="Search books..."
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-indigo-500 px-3 py-1.5 rounded-full text-white font-semibold shadow-sm ml-2"
                >
                  Search
                </button>
              </form>
            </div>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                to="/create-book"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
                aria-label="Add a new book"
              >
                + Add Book
              </Link>

              <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition"
                title="Toggle menu"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {open ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            id="mobile-menu"
            className={`md:hidden mt-3 transition-[max-height,opacity] duration-350 ease-in-out ${
              open
                ? "max-h-[520px] opacity-100"
                : "max-h-0 opacity-0 pointer-events-none"
            } overflow-hidden`}
          >
            <div className="bg-gradient-to-r from-gray-900/95 to-indigo-900/95 rounded-xl p-4 border border-white/10 shadow-lg space-y-4">
              {/* Mobile Search */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  doSearch(query);
                }}
                className="flex items-center gap-2"
                role="search"
                aria-label="Search books"
              >
                <input
                  aria-label="Search books"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-full bg-white/6 placeholder:text-white/70 text-white outline-none border border-white/10"
                  placeholder="Search books..."
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold shadow"
                >
                  Search
                </button>
              </form>

              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg font-semibold text-white/90 hover:bg-white/5 hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-2 border-t border-white/5 mt-2">
                <Link
                  to="/create-book"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center px-4 py-2 mt-2 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold shadow"
                >
                  + Add Book
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
