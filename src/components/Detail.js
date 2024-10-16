import React, { useState, useEffect } from "react";
import useStore from "@/store/store";

export default function Detail({ product }) {
  const [showTallas, setShowTallas] = useState(false);
  const [selectedTalla, setSelectedTalla] = useState(null);
  const [customTalla, setCustomTalla] = useState("");
  const { dolarBlue, fetchDolarBlue } = useStore();

  useEffect(() => {
    fetchDolarBlue();
  }, [fetchDolarBlue]);

  const handleCompraClick = () => {
    const message = selectedTalla
      ? `Hola, quiero comprar la zapatilla ${product.nombre} en el talle ${selectedTalla}`
      : `Hola, quiero encargar estas zapatillas ${product.nombre} en talle ${customTalla}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=3512591212&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleTallaSelect = (talla) => {
    if (selectedTalla === talla) {
      setSelectedTalla(null);
    } else {
      setSelectedTalla(talla);
      setCustomTalla("");
    }
  };

  return (
    <div className="container py-10 mx-auto sm:flex sm:flex-col lg:flex-row lg:space-x-10">
      <div className="px-2 mb-6 lg:w-1/2 sm:w-full lg:mb-0">
        <img
          src={product.image?.base64}
          alt={product.nombre}
          className="object-contain w-full h-auto max-h-[700px]"
        />
      </div>
      <div className="flex flex-col w-full p-2 space-y-4 lg:w-1/2">
        <h2 className="text-3xl font-bold text-gray-800 lg:text-4xl">{product.nombre}</h2>
        <div className="space-y-2 text-gray-800">
          <p className="text-lg font-semibold">{product.descripcion}</p>
          <p className="text-4xl font-bold">${product.precio} USD</p>
          <p className="text-lg text-gray-400">${(product.precio * dolarBlue).toFixed(2)} ARS</p>
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
              {Object.entries(product.tallas).map(([talla, stock], index) => (
                <button
                  key={index}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${selectedTalla === talla ? "font-bold" : ""
                    }`}
                  onClick={() => handleTallaSelect(talla)}
                >
                  Talla {talla} {stock > 0 ? "(En stock)" : "(Sin stock)"}
                </button>
              ))}
              <p className="px-4 py-2 text-left text-red-600" >¿No encontras el talle que buscas?</p>
              <div className="flex items-center justify-between px-4 py-2  space-x-4">
                <input
                  type="text"
                  placeholder="Ingresa tu talle"
                  value={customTalla}
                  onChange={(e) => setCustomTalla(e.target.value)}
                  className="px-2 py-1 border border-gray-400 rounded-md"
                />
                <button
                  onClick={() => {
                    if (customTalla) {
                      handleCompraClick();
                    }
                  }}
                  className="px-2 py-1 text-white bg-red-500 rounded-md"
                >
                  PEDILO YA
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="text-sm text-gray-600">
          {Object.entries(product.tallas).some(([_, stock]) => stock > 0) ? (
            <span className="text-green-500">Entrega inmediata</span>
          ) : (
            <span className="text-red-500">Disponible en 20  días</span>
          )}
        </div>
        {selectedTalla && (
          <div className="mt-2 text-sm text-gray-600">
            Has seleccionado la talla: <span className="font-bold">{selectedTalla}</span>
            <button
              onClick={() => setSelectedTalla(null)}
              className="ml-2 text-sm text-red-500 hover:underline"
            >
              Deseleccionar
            </button>
          </div>
        )}

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>✓</span>
          <p>Artículo verificado, 100% original.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>⏰</span>
          <p>Stock bajo demanda. Ordena pronto.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2">
          <div className="p-4 text-sm text-center text-gray-600 border rounded-md">
            Envíos gratis a todo el pais.
          </div>
          <div className="p-4 text-sm text-center text-gray-600 border rounded-md">
            Entrega en Córdoba Capital
          </div>
        </div>
        <div className="mt-4">
          <button
            className={`flex items-center justify-center w-full px-4 py-2 text-white bg-green-500 border border-gray-400 rounded-md hover:bg-green-600`}
            onClick={handleCompraClick}
            disabled={!selectedTalla && !customTalla}
          >
            {selectedTalla ? "Comprar" : "Consultar stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
