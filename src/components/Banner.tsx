import { useState, useEffect } from "react";

const slides = [
  {
    img: "https://res.cloudinary.com/dn2wb32gr/image/upload/v1760779051/mari-potter_vwimmf.jpg",
    text: "Discover Your Next Favorite Book",
  },
  {
    img: "https://res.cloudinary.com/dn2wb32gr/image/upload/v1760779522/jessica-ruscello_qq0med.jpg",
    text: "Borrow, Read, and Return with Ease",
  },
  {
    img: "https://res.cloudinary.com/dn2wb32gr/image/upload/v1760780184/susan-q-yin_abzd2n.jpg",
    text: "Expand Your Mind with BookMate",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(timer);
  }, [length]);

  if (length === 0) return null;

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg mt-20">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.img}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h2 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg text-center px-4">
              {slide.text}
            </h2>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-pink-500" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
