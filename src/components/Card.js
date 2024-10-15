import React, { useEffect } from "react";
import Link from "next/link";
import useStore from "@/store/store";

export default function Card({ currentProducts }) {
  const { dolarBlue, fetchDolarBlue } = useStore();
  
  useEffect(() => {
    fetchDolarBlue();
  }, [fetchDolarBlue]);

  const getDisponibilidad = (product) => {
    const hasTallas = product.tallas && Object.keys(product.tallas).length > 0;

    if (hasTallas) {
      return { message: "Entrega inmediata", color: "text-green-500" };
    } else if (product.encargo) {
      return { message: "Disponible en 15 días", color: "text-red-500" };
    } else {
      return { message: "Disponible en 3 días", color: "text-yellow-500" };
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {currentProducts.map((product) => {
          const disponibilidad = getDisponibilidad(product);
          return (
            <Link href={`/producto/${product._id}`} key={product.id}>
              <div key={product._id} className="flex flex-col justify-between h-full transition-transform transform hover:scale-105">
                <img
                  src={product.image?.base64}
                  alt={product.nombre}
                  className="object-cover w-full mb-3 h-80"
                  />
                <h3 className="text-lg font-semibold">{product.nombre}</h3>
                <div className="flex flex-col mt-2">
                  <p className="text-lg font-bold text-gray-800">${product.precio} USD</p>
                  <p className="text-lg font-bold text-gray-800">
                    {(product.precio * dolarBlue).toFixed(2)} ARS
                  </p>
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
