import React, { useEffect, useRef } from "react";

export default function Carousell() {
  const product = {
    description: "NIKE AIR FORCE 1 LOW '07 WHITE",
    price: "$258.990,00",
    image: "/images/jordanlow.png", // Asegúrate de que esta ruta sea correcta
  };

  const carouselRef = useRef(null);

  // Movimiento automático
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const maxScrollLeft =
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

        // Si estamos al final, volvemos al inicio
        if (carouselRef.current.scrollLeft >= maxScrollLeft) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Desplazamiento suave hacia la derecha
          carouselRef.current.scrollBy({
            left: 100, // Desplazamiento más suave
            behavior: "smooth",
          });
        }
      }
    }, 3000); // Desplaza cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto mt-10 overflow-hidden">
      <div
        className="flex w-full  overflow-x-auto no-scrollbar"
        ref={carouselRef}
        style={{
          scrollbarWidth: "none", /* Firefox */
          msOverflowStyle: "none", /* IE y Edge */
        }}
      >
        {/* Repite 6 tarjetas */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-96 flex-shrink-0  bg-white overflow-hidden mx-2" // Aumentado el ancho de la tarjeta
          >
            <img
              src={product.image}
              alt={product.description}
              className="h-96 w-full object-cover" // Aumentada la altura de la imagen
            />
            <div className="flex bg-gray-200 flex-col justify-start  mt-7"> {/* Añadido margen superior aquí */}
              <h5 className="text-xl font-normal text-black mb-1 mt-3 truncate">
                {product.description}
              </h5>
              <p className="text-lg font-normal text-black mt-3">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
