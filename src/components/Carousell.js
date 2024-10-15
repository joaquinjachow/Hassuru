import React, { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

export default function Carousell({ title, products }) {
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
    <div className="relative w-full">
      <div className="container p-4 mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold sm:text-4xl">{title}</h1>
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
          className="flex gap-4 mt-8"
          id="carousel"
          style={{ overflow: "hidden" }}
        >
          {products.map((product, index) => (
            <div key={index} className="flex-none w-48 sm:w-64">
              <Link href={`/producto/${product._id}`}>
                <div className="flex flex-col justify-between h-full">
                  <img
                    src={product.image?.base64 || "/images/default.png"}
                    alt={product.nombre}
                    className="object-cover w-full h-48 mb-3 sm:h-64"
                  />
                  <h3 className="text-sm font-semibold sm:text-lg">{product.nombre}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
