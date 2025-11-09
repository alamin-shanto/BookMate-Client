import React from "react";
import { Link } from "react-router-dom";

function SocialIcon({
  href,
  children,
  label,
}: {
  href: string;
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label || "social link"}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/6 hover:bg-white/10 transition shadow-sm"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Brand & short */}
          <div className="flex-1 min-w-0">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center rounded-lg w-10 h-10 bg-gradient-to-br from-pink-500 to-indigo-600 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 6.5C3 5.67 3.67 5 4.5 5h11.586a1 1 0 0 1 .707.293l3.914 3.914A1 1 0 0 1 21 9.414V18.5c0 .83-.67 1.5-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-12z" />
                </svg>
              </span>

              <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                BookMate
              </span>
            </Link>

            <p className="text-sm text-white/80 max-w-md">
              Beautifully minimal library management — browse, borrow and manage
              books with style.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <SocialIcon href="https://twitter.com" label="Twitter">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1s-1.64.98-2.48 1.23A4.48 4.48 0 0 0 16.11 1c-2.66 0-4.8 2.56-4.13 5.12A12.94 12.94 0 0 1 2.24 2.8S-1 9.13 6 13c-2.76.77-4.2.27-6.56-.81 0 0 4.5 6.88 12.2 6.07A13.13 13.13 0 0 1 3 21c7.07 4.5 15.93 0 15.93-11.5v-.6A9.72 9.72 0 0 0 23 3z" />
                </svg>
              </SocialIcon>

              <SocialIcon
                href="https://github.com/alamin-shanto"
                label="GitHub"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white"
                >
                  <path d="M12 .5C5.37.5 0 5.86 0 12.5c0 5.28 3.438 9.75 8.205 11.33.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.338.73-4.042-1.61-4.042-1.61-.546-1.4-1.333-1.77-1.333-1.77-1.09-.74.08-.72.08-.72 1.205.09 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.487 1 .11-.79.42-1.31.764-1.61-2.665-.3-5.466-1.33-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.124-.3-.536-1.52.117-3.17 0 0 1.007-.32 3.3 1.23a11.45 11.45 0 0 1 3-.41c1.02.005 2.05.14 3 .41 2.28-1.55 3.29-1.23 3.29-1.23.656 1.65.244 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.91.43.37.81 1.1.81 2.22 0 1.61-.015 2.9-.015 3.29 0 .32.21.69.825.57C20.565 22.245 24 17.78 24 12.5 24 5.86 18.63.5 12 .5z" />
                </svg>
              </SocialIcon>

              <SocialIcon
                href="https://www.linkedin.com/in/mash02/"
                label="LinkedIn"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white"
                >
                  <path d="M20.45 20.45h-3.56v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85v5.5H9.5V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.62 0 4.29 2.38 4.29 5.47v6.73zM5.34 7.43c-1.14 0-2.07-.93-2.07-2.07 0-1.15.93-2.08 2.07-2.08 1.15 0 2.08.93 2.08 2.08 0 1.14-.93 2.07-2.08 2.07zM7.12 20.45H3.56V9H7.12v11.45z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Links + newsletter */}
          <div className="flex-1 flex flex-col sm:flex-row gap-8 md:gap-16">
            <div className="min-w-[160px]">
              <h4 className="text-sm font-semibold text-white/90 mb-3">
                Explore
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/books"
                    className="text-white/80 hover:text-white transition"
                  >
                    All Books
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-book"
                    className="text-white/80 hover:text-white transition"
                  >
                    Add Book
                  </Link>
                </li>
                <li>
                  <Link
                    to="/borrow-summary"
                    className="text-white/80 hover:text-white transition"
                  >
                    Borrow Summary
                  </Link>
                </li>
              </ul>
            </div>

            <div className="min-w-[160px]">
              <h4 className="text-sm font-semibold text-white/90 mb-3">
                Support
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    className="text-white/80 hover:text-white transition"
                    href="#help"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    className="text-white/80 hover:text-white transition"
                    href="#docs"
                  >
                    Docs
                  </a>
                </li>
                <li>
                  <a
                    className="text-white/80 hover:text-white transition"
                    href="#feedback"
                  >
                    Feedback
                  </a>
                </li>
              </ul>
            </div>

            <div className="min-w-[220px]">
              <h4 className="text-sm font-semibold text-white/90 mb-3">
                Stay in the loop
              </h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // placeholder - implement subscribe API
                  alert("Thanks — newsletter signup placeholder.");
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  aria-label="Enter your email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-full bg-white/6 placeholder:text-white/70 text-white outline-none border border-white/10"
                />
                <button className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold shadow">
                  Join
                </button>
              </form>

              <p className="text-xs text-white/70 mt-3">
                No spam — unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="mt-10 border-t border-white/6 pt-6 flex flex-col md:flex-row md:justify-between items-center gap-4">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} BookMate. All rights reserved.
          </p>

          <div className="text-sm text-white/70 flex items-center gap-4">
            <Link to="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
