import React from "react";

export default function Catalogo() {
  // Simulación de datos de productos
  const products = [
    {
      nombre: "Nike Dunk Low Retro White Black",
      precios: { AR: 258990, USD: 150 },
      stock: 0, // Simulación de stock 0 (disponible en 15 días)
    },
    {
      nombre: "Air Jordan 4 Retro White Oreo",
      precios: { AR: 309990, USD: 180 },
      stock: 1, // Simulación de stock disponible (entrega inmediata)
    },
    {
      nombre: "Nike Air Force 1 '07 Triple White",
      precios: { AR: 229990, USD: 130 },
      stock: 1, // Stock disponible (entrega inmediata)
    },
    {
      nombre: "Nike Dunk Low Retro Black Red",
      precios: { AR: 239990, USD: 160 },
      stock: 1, // Stock disponible (entrega inmediata)
    },
    {
      nombre: "Adidas Yeezy Boost 350 V2",
      precios: { AR: 419990, USD: 250 },
      stock: 0, // Simulación de stock 0 (disponible en 15 días)
    },
    {
      nombre: "Puma RS-X Reinvention",
      precios: { AR: 179990, USD: 100 },
      stock: 1, // Stock disponible (entrega inmediata)
    },
  ];

  // Función que retorna el mensaje de disponibilidad y el color
  const getDisponibilidad = (stock) => {
    if (stock === 0) {
      return { message: "Disponible en 15 días", color: "text-red-500" }; // Color rojo
    } else {
      return { message: "Entrega inmediata", color: "text-green-500" }; // Color verde
    }
  };

  return (
    <div className="container mx-auto py-10 flex">
      {/* Productos a la derecha */}
      <section className="w-3/4">
        {/* Mostrar productos en un grid de 4 por fila */}
        <div className="grid grid-cols-4 gap-4">
          {products.map((product, index) => {
            const disponibilidad = getDisponibilidad(product.stock);
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-3 flex flex-col justify-between h-full transition-transform transform hover:scale-105"
              >
                <img
                  src="/images/jordanlow.png" // Asegúrate de que esta ruta sea correcta
                  alt={product.nombre}
                  className="h-48 w-full object-contain mb-3"
                />
                <h3 className="text-lg font-semibold flex-grow">{product.nombre}</h3>

                {/* Precios diferenciados */}
                <div className="flex flex-col mt-2">
                  <p className="text-lg font-bold text-gray-800">${product.precios.USD} USD</p> {/* Precio en USD */}
                  <p className="text-lg font-bold text-gray-800">${product.precios.AR} ARS</p> {/* Precio en AR */}
                </div>

                {/* Mostrar mensaje de disponibilidad basado en stock */}
                <p className={`${disponibilidad.color} text-sm mt-1`}>
                  {disponibilidad.message}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
