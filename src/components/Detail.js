import React, { useState } from "react";

export default function Detail({ product }) { // Recibe el producto como prop
  const [showTallas, setShowTallas] = useState(false);
console.log(product)
  return (
    <div className="container flex py-10 mx-auto">
      {/* Imagen del producto */}
      <div className="w-1/2 pr-10">
        <img
          src={product.image.url}
          alt={product.nombre}
          className="object-contain w-full h-auto"
        />
      </div>

      {/* Detalles del producto */}
      <div className="flex flex-col w-1/2 space-y-4">
        <h2 className="text-3xl font-semibold text-gray-800">{product.nombre}</h2>
        <div className="text-gray-800">
          <p className="text-2xl font-bold">${product.precios.AR.toLocaleString()} (ARS)</p>
          <p className="text-lg text-gray-500">Aprox USD ${product.precios.USD}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowTallas(!showTallas)}
            className="flex items-center justify-between w-full px-4 py-2 text-left text-black bg-white border border-gray-400 rounded-md hover:bg-gray-100"
          >
            <span>Ver talles disponibles</span>
            <span>▼</span>
          </button>
          {showTallas && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-md">
              {product.tallas.map((talla, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  {talla}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>✓</span>
          <p>Artículo verificado, 100% original.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>⏰</span>
          <p>Solo quedan {product.stock} en stock. Ordena pronto.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-4 text-sm text-center text-gray-600 border rounded-md">
            Envíos a todo el país. CABA en 24hs.
          </div>
          <div className="p-4 text-sm text-center text-gray-600 border rounded-md">
            Pagos 100% seguros.
          </div>
        </div>
        <div className="mt-4">
          <button
            className="flex items-center justify-center w-full px-4 py-2 text-left text-white bg-green-500 border border-gray-400 rounded-md hover:bg-green-600"
            onClick={() => alert("Redirigiendo a WhatsApp...")}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
