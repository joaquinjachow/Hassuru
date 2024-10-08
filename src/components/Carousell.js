import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importa los íconos

export default function Carousell() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/productos");
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Auto-scroll cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      carouselRef.current.scrollBy({
        left: 300, // Cantidad de desplazamiento
        behavior: "smooth",
      });
    }, 3000); // Intervalo de 3 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold">Destacados</h1>
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
