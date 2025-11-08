import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { BookOpen, Users, BookmarkCheck, Library } from "lucide-react";

export default function LibraryStats() {
  const stats = [
    { icon: Library, label: "Total Books", value: 245 },
    { icon: BookmarkCheck, label: "Books Borrowed", value: 87 },
    { icon: Users, label: "Active Members", value: 32 },
    { icon: BookOpen, label: "Available Genres", value: 12 },
  ];

  const [globalKey, setGlobalKey] = useState<number>(() => Date.now());
  const [hoverKey, setHoverKey] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // containerRef typed as HTMLDivElement (section/div-like element)
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // update key to remount CountUp instances
            setGlobalKey(Date.now());
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const triggerHover = (index: number) => {
    setHoveredIndex(index);
    setHoverKey(Date.now());
  };
  const clearHover = () => {
    setHoveredIndex(null);
  };

  const adaptCountUpRef =
    (countUpRef: React.LegacyRef<HTMLElement> | undefined) =>
    (el: HTMLDivElement | null) => {
      if (!countUpRef) return;
      if (typeof countUpRef === "function") {
        try {
          // callback ref — CountUp may expect HTMLElement | null
          (countUpRef as (node: HTMLElement | null) => void)(el);
        } catch {
          /* ignore host ref errors */
        }
      } else if (typeof countUpRef === "object") {
        try {
          // object ref: { current: HTMLElement | null }
          (countUpRef as React.MutableRefObject<HTMLElement | null>).current =
            el;
        } catch {
          /* ignore */
        }
      }
    };

  return (
    <section
      // it's fine to attach a div-ref to a section element in TSX
      ref={containerRef}
      className="py-20 px-6 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-100 rounded-3xl shadow-xl mt-14 overflow-hidden relative"
      aria-label="Library statistics"
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-200 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-14 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
          📊 Library at a Glance
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, label, value }, i) => {
            const countKey =
              hoveredIndex === i ? `hover-${hoverKey}` : `global-${globalKey}`;

            return (
              <div
                key={i}
                role="button"
                tabIndex={0}
                onMouseEnter={() => triggerHover(i)}
                onMouseLeave={clearHover}
                onTouchStart={() => triggerHover(i)}
                onTouchEnd={clearHover}
                onFocus={() => triggerHover(i)}
                onBlur={clearHover}
                className="group relative bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md hover:shadow-pink-200 p-8 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 cursor-pointer"
                aria-label={`${label}: ${value}`}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-pink-100/60 via-indigo-100/40 to-transparent" />

                <div className="relative z-10 flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7" />
                  </div>
                </div>

                <div className="relative z-10" aria-live="polite">
                  <CountUp key={countKey} start={0} end={value} duration={1.6}>
                    {({ countUpRef }) => (
                      <div
                        // pass CountUp's ref through the adapter (now accepts HTMLElement shapes)
                        ref={adaptCountUpRef(countUpRef)}
                        className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent"
                      />
                    )}
                  </CountUp>
                </div>

                <p className="relative z-10 text-sm font-medium text-gray-600 mt-3 group-hover:text-gray-800 transition-colors duration-200">
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        :focus { outline: none; }
      `}</style>
    </section>
  );
}
