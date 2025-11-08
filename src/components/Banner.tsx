import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    img: "https://res.cloudinary.com/dn2wb32gr/image/upload/v1760779051/mari-potter_vwimmf.jpg",
    text: "Discover Your Next Favorite Book",
    alt: "Stack of books on a wooden table",
  },
  {
    img: "https://res.cloudinary.com/dn2wb32gr/image/upload/v1760779522/jessica-ruscello_qq0med.jpg",
    text: "Borrow, Read, and Return with Ease",
    alt: "Person reaching for a book in a cozy library",
  },
  {
    img: "https://res.cloudinary.com/dn2wb32gr/image/upload/v1760780184/susan-q-yin_abzd2n.jpg",
    text: "Expand Your Mind with BookMate",
    alt: "Open book with warm light",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const startAuto = () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        setCurrent((c) => (c + 1) % length);
      }, 5000);
    };

    if (!isPaused) startAuto();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isPaused, length]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % length);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + length) % length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [length]);

  // helpers
  const prev = () => setCurrent((c) => (c - 1 + length) % length);
  const next = () => setCurrent((c) => (c + 1) % length);

  // touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current == null || touchEndX.current == null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (length === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="BookMate hero carousel"
      className="relative w-full"
    >
      <div
        className="relative w-full h-64 md:h-[28rem] lg:h-[32rem] rounded-lg overflow-hidden shadow-2xl mx-auto max-w-7xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-800 ease-out ${
              idx === current
                ? "opacity-100 z-10"
                : "opacity-0 pointer-events-none z-0"
            }`}
            aria-hidden={idx !== current}
          >
            <img
              src={slide.img}
              srcSet={`${slide.img} 1x`}
              alt={slide.alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />

            {/* Gradient overlay + centered content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent flex items-end md:items-center">
              <div className="max-w-5xl mx-auto px-6 py-8 md:py-12 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-1 text-white">
                  <h2
                    className="text-2xl md:text-4xl font-extrabold leading-tight drop-shadow-lg"
                    id={`carousel-heading-${idx}`}
                  >
                    {slide.text}
                  </h2>
                  <p className="mt-3 text-sm md:text-base text-white/90 max-w-xl">
                    Discover, borrow and track your favourite reads — fast and
                    beautiful.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to="/books"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg transform transition hover:-translate-y-1"
                    >
                      Browse books
                    </Link>

                    <Link
                      to="/create-book"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-indigo-700 font-semibold shadow-sm hover:scale-[1.02] transition"
                    >
                      Add new book
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Prev / Next Controls */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 rounded-full p-2 shadow-md hover:scale-105 transition z-20"
        >
          ‹
        </button>

        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 rounded-full p-2 shadow-md hover:scale-105 transition z-20"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === current}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === current
                  ? "bg-pink-500 scale-125 shadow-lg"
                  : "bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
