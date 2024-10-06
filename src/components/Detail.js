import React, { useState } from "react";

export default function Detail() {
  // Simulación de datos del producto
  const product = {
    nombre: "Vans Knu Skool Mega Check Black",
    precios: { AR: 277200, USD: 232 },
    tallas: ["7us (25cm)", "8us (26cm)", "9us (27cm)", "10us (28cm)"],
    stock: 1, // Cambiar a 0 para probar "Disponible en 15 días"
  };

  // Estado para controlar el desplegable de tallas
  const [showTallas, setShowTallas] = useState(false);

  return (
    <div className="container mx-auto py-10 flex">
      {/* Imagen del producto */}
      <div className="w-1/2 pr-10">
        <img
          src="/images/jordanlow.png"
          alt={product.nombre}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Detalles del producto */}
      <div className="w-1/2 flex flex-col space-y-4">
        {/* Título del producto */}
        <h2 className="text-3xl font-semibold text-gray-800">{product.nombre}</h2>

        {/* Precios */}
        <div className="text-gray-800">
          <p className="text-2xl font-bold">${product.precios.AR.toLocaleString()} (ARS)</p>
          <p className="text-lg text-gray-500">Aprox USD ${product.precios.USD}</p>
        </div>

        {/* Tallas (desplegable) */}
        <div className="relative">
          <button
            onClick={() => setShowTallas(!showTallas)}
            className="w-full text-left border border-gray-400 text-black py-2 px-4 rounded-md hover:bg-gray-100 bg-white flex justify-between items-center"
          >
            <span>Ver talles disponibles</span>
            <span>▼</span>
          </button>
          {showTallas && (
            <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-md z-10">
              {product.tallas.map((talla, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {talla}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Verificación del artículo */}
        <div className="flex items-center text-sm text-gray-600 space-x-2">
          <span>✓</span>
          <p>Artículo verificado, 100% original.</p>
        </div>

        {/* Stock */}
        <div className="flex items-center text-sm text-gray-600 space-x-2">
          <span>⏰</span>
          <p>Solo quedan {product.stock} en stock. Ordena pronto.</p>
        </div>

        {/* Card de información adicional */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="border p-4 rounded-md text-center text-sm text-gray-600">
            Envíos a todo el país. CABA en 24hs.
          </div>
          <div className="border p-4 rounded-md text-center text-sm text-gray-600">
            Pagos 100% seguros.
          </div>
        </div>

        {/* Botón "Comprar" (simulación de enlace a WhatsApp) */}
        <div className="mt-4">
          <button
            className="w-full text-left border border-gray-400 text-white py-2 px-4 rounded-md hover:bg-green-600 bg-green-500 flex justify-center items-center"
            onClick={() => alert("Redirigiendo a WhatsApp...")}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
