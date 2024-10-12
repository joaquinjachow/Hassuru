import React from "react";
import Link from "next/link";

export default function Card({ currentProducts }) {
  const getDisponibilidad = (product) => {
    if (product.tallas && Object.keys(product.tallas).length > 0) {
      return { message: "Entrega inmediata", color: "text-green-500" };
    } else {
      return { message: "Disponible en 15 días", color: "text-red-500" };
    }
  };

  return (
    <div className="p-4"> {/* Agregado padding aquí */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product, index) => {
          const disponibilidad = getDisponibilidad(product);
          return (
            <Link href={`/producto/${product._id}`} key={product.id}>
              <div key={index} className="flex flex-col justify-between h-full transition-transform transform hover:scale-105">
                <img
                  src={product.image?.url || "/images/default.png"}
                  alt={product.nombre}
                  className="object-contain w-full mb-3"
                />
                <h3 className="text-lg font-semibold">{product.nombre}</h3>
                <div className="flex flex-col mt-2">
                  <p className="text-lg font-bold text-gray-800">${product.precios.USD} USD</p>
                  <span className={disponibilidad.color}>{disponibilidad.message}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
