import React, { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Carousell({title, products}) {
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold">{title}</h1>
          {/* Botones de navegación */}
          <div>
            <button
              className="p-2 text-black transform hover:scale-105"
              onClick={() =>
                carouselRef.current.scrollBy({
                  left: -300,
                  behavior: "smooth",
                })
              }
            >
              <FaChevronLeft />
            </button>
            <button
              className="p-2 text-black transform hover:scale-105"
              onClick={() =>
                carouselRef.current.scrollBy({
                  left: 300,
                  behavior: "smooth",
                })
              }
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        <div
          ref={carouselRef}
          className="flex gap-4 mt-8 overflow-x-hidden snap-x snap-mandatory scroll-smooth"
          id="carousel"
        >
          {products.map((product, index) => (
            <div key={index} className="flex-none w-64 snap-center">
              <div className="flex flex-col justify-between h-full">
                <img
                  src={product.image?.url || "/images/default.png"}
                  alt={product.nombre}
                  className="object-contain w-full mb-3"
                />
                <h3 className="text-lg font-semibold">{product.nombre}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
