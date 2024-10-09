import React, { useState } from "react";

export default function Detail({ product }) {
  const [showTallas, setShowTallas] = useState(false);
  const [selectedTalla, setSelectedTalla] = useState(null);
  const [customTalla, setCustomTalla] = useState("");

  const handleCompraClick = () => {
    const message = selectedTalla
      ? `Hola, quiero comprar la zapatilla ${product.nombre} en el talle ${selectedTalla}`
      : `Hola, quiero encargar estas zapatillas ${product.nombre} en talle ${customTalla}`;
    const phoneNumber = '3512591212';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleTallaSelect = (talla) => {
    if (selectedTalla === talla) {
      // Si ya está seleccionada, deseleccionar
      setSelectedTalla(null);
    } else {
      // Seleccionar la talla
      setSelectedTalla(talla);
      setCustomTalla(""); // Limpiar el talle personalizado
    }
  };

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

        {/* Mensaje de disponibilidad */}
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
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                    selectedTalla === talla ? "font-bold" : ""
                  }`}
                  onClick={() => handleTallaSelect(talla)} // Cambia el estado de la talla seleccionada
                >
                  Talla {talla} {stock > 0 ? "(En stock)" : "(Sin stock)"}
                </button>
              ))}
              {/* Campo para ingresar talla personalizada */}
              <div className="flex items-center justify-between px-4 py-2">
                <input
                  type="text"
                  placeholder="Ingresa tu talle"
                  value={customTalla}
                  onChange={(e) => setCustomTalla(e.target.value)}
                  className="border border-gray-400 rounded-md px-2 py-1"
                />
                <button
                  onClick={() => {
                    if (customTalla) {
                      handleCompraClick(); // Redirige a WhatsApp con el mensaje de encargo
                    }
                  }}
                  className="bg-red-500 text-white rounded-md px-2 py-1" // Botón de pedir talle en rojo
                >
                  Pedir talle
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mensaje de disponibilidad */}
        <div className="text-sm text-gray-600">
          {Object.entries(product.tallas).some(([_, stock]) => stock > 0) ? (
            <span className="text-green-500">Entrega inmediata</span>
          ) : (
            <span className="text-red-500">Disponible en 15 días</span>
          )}
        </div>

        {/* Mensaje de talla seleccionada */}
        {selectedTalla && (
          <div className="mt-2 text-sm text-gray-600">
            Has seleccionado la talla: <span className="font-bold">{selectedTalla}</span>
            <button
              onClick={() => setSelectedTalla(null)} // Limpiar la talla seleccionada
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
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-4 text-sm text-center text-gray-600 border rounded-md">
            Envíos a todo el país. Córdoba en 24hs.
          </div>
        </div>
        <div className="mt-4">
          <button
            className={`flex items-center justify-center w-full px-4 py-2 text-left text-white bg-green-500 border border-gray-400 rounded-md hover:bg-green-600`}
            onClick={handleCompraClick}
            disabled={!selectedTalla && !customTalla} // Deshabilita el botón si no hay talla seleccionada ni personalizada
          >
            {selectedTalla ? "Comprar" : "Consultar stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
