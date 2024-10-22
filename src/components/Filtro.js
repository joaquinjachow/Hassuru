import { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";

export default function Filter({ products, setFilteredProducts }) {
  const [selectedTallaRopa, setSelectedTallaRopa] = useState("");
  const [selectedTallaZapatilla, setSelectedTallaZapatilla] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [stockOnly, setStockOnly] = useState(false);
  const [selectedDisponibilidad, setSelectedDisponibilidad] = useState("");
  const [tallasRopa, setTallasRopa] = useState([]);
  const [tallasZapatilla, setTallasZapatilla] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [showFilters, setShowFilters] = useState(true); // Estado para mostrar/ocultar filtros
  const [query, setQuery] = useState(""); // Estado para búsqueda

  useEffect(() => {
    const marcasSet = new Set();
    products.forEach((product) => marcasSet.add(product.marca));
    setMarcas(Array.from(marcasSet));
  }, [products]);

  useEffect(() => {
    let filtered = products;
    if (selectedMarca) {
      filtered = filtered.filter((product) => product.marca === selectedMarca);
    }
    setFilteredProducts(filtered);
  }, [selectedMarca, products]);

  useEffect(() => {
    const tallasRopaSet = new Set();
    const tallasZapatillaSet = new Set();
    products.forEach((product) => {
      if (product.categoria === "ropa" || product.categoria === "accesorios") {
        Object.keys(product.tallas).forEach((talla) => tallasRopaSet.add(talla));
      } else if (product.categoria === "zapatillas") {
        Object.keys(product.tallas).forEach((talla) => tallasZapatillaSet.add(talla));
      }
    });
    setTallasRopa(Array.from(tallasRopaSet));
    setTallasZapatilla(Array.from(tallasZapatillaSet));
  }, [products]);

  const getDisponibilidad = (product) => {
    const hasTallas = product.tallas && Object.keys(product.tallas).length > 0;
    if (hasTallas) {
      return "Entrega inmediata";
    } else if (product.encargo) {
      return "Disponible en 15 días";
    } else {
      return "Disponible en 3 días";
    }
  };

  useEffect(() => {
    let filtered = products;
    if (selectedTallaRopa) {
      filtered = filtered.filter(
        (product) =>
          (product.categoria === "ropa" || product.categoria === "accesorios") &&
          product.tallas[selectedTallaRopa] !== undefined
      );
    }
    if (selectedTallaZapatilla) {
      filtered = filtered.filter(
        (product) =>
          product.categoria === "zapatillas" && product.tallas[selectedTallaZapatilla]
      );
    }
    if (stockOnly) {
      filtered = filtered.filter((product) =>
        Object.values(product.tallas).some((stock) => stock > 0)
      );
    }
    if (selectedDisponibilidad) {
      filtered = filtered.filter((product) => {
        if (selectedDisponibilidad === "Solo productos en stock") {
          return Object.values(product.tallas).some((stock) => stock > 0) || getDisponibilidad(product) === "Entrega inmediata";
        }
        return getDisponibilidad(product) === selectedDisponibilidad;
      });
    }

    setFilteredProducts(filtered);
  }, [
    selectedTallaRopa,
    selectedTallaZapatilla,
    stockOnly,
    selectedDisponibilidad,
    products,
  ]);

  const handleSearch = () => {
    let filtered = products;
    if (precioMin || precioMax) {
      filtered = filtered.filter((product) => {
        const precio = product.precio;
        if (precioMin && precioMax) {
          return precio >= parseInt(precioMin) && precio <= parseInt(precioMax);
        } else if (precioMin) {
          return precio >= parseInt(precioMin);
        } else if (precioMax) {
          return precio <= parseInt(precioMax);
        }
        return true;
      });
    }
    if (query) { // Asegúrate de que la búsqueda se aplique
      filtered = filtered.filter((product) =>
        product.nombre.toLowerCase().includes(query.toLowerCase()) // Ajusta esto según cómo se llama la propiedad que contiene el texto a buscar
      );
    }
    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setSelectedTallaRopa("");
    setSelectedTallaZapatilla("");
    setSelectedMarca("");
    setPrecioMin("");
    setPrecioMax("");
    setStockOnly(false);
    setSelectedDisponibilidad("");
    setQuery(""); // Reiniciar la búsqueda
    setFilteredProducts(products);
  };

  const handleSelectTallaRopa = (talla) => {
    setSelectedTallaRopa(talla);
    setSelectedTallaZapatilla("");
  };

  const handleSelectTallaZapatilla = (talla) => {
    setSelectedTallaZapatilla(talla);
    setSelectedTallaRopa("");
  };

  const handleSelectDisponibilidad = (opcion) => {
    if (selectedDisponibilidad === opcion) {
      setSelectedDisponibilidad("");
    } else {
      setSelectedDisponibilidad(opcion);
    }
  };

  const handleSelectMarca = (marca) => {
    setSelectedMarca(marca);
  };

  return (
    <main className="px-4 font-semibold md:px-12">
      <div className="mb-4">
        <h3 className="mb-3 text-xl font-semibold text-gray-800">Filtros</h3>
        <div className="mb-4">
          {selectedTallaRopa && (
            <div className="flex items-center mb-2">
              <span className="mr-2 text-gray-600">Talla de Ropa: {selectedTallaRopa}</span>
              <button onClick={() => setSelectedTallaRopa("")} className="text-red-500">X</button>
            </div>
          )}
          {selectedTallaZapatilla && (
            <div className="flex items-center mb-2">
              <span className="mr-2 text-gray-600">Talla de Zapatillas: {selectedTallaZapatilla}</span>
              <button onClick={() => setSelectedTallaZapatilla("")} className="text-red-500">X</button>
            </div>
          )}
          {stockOnly && (
            <div className="flex items-center mb-2">
              <span className="mr-2 text-gray-600">Solo en stock</span>
              <button onClick={() => setStockOnly(false)} className="text-red-500">X</button>
            </div>
          )}
          {selectedDisponibilidad && (
            <div className="flex items-center mb-2">
              <span className="mr-2 text-gray-600">Disponibilidad: {selectedDisponibilidad}</span>
              <button onClick={() => setSelectedDisponibilidad("")} className="text-red-500">X</button>
            </div>
          )}
          {selectedMarca && (
            <div className="flex items-center mb-2">
              <span className="mr-2 text-gray-600">Marca: {selectedMarca}</span>
              <button onClick={() => setSelectedMarca("")} className="text-red-500">X</button>
            </div>
          )}

          {/* Mostrar el filtro de búsqueda solo si hay consulta */}
          {query && (
            <div className="flex items-center mb-2">
              <span className="mr-2 text-gray-600">Búsqueda: {query}</span>
              <button onClick={() => setQuery("")} className="text-red-500">X</button>
            </div>
          )}
        </div>
      </div>
      <div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`mb-4 px-4 py-2 text-white md:hidden bg-red-500 rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:bg-red-600 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300`}
        >
          {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
        </button>

        {showFilters && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Marca</label>
              <div className="overflow-auto max-h-32">
                {marcas.map((marca, index) => (
                  <div key={index} className="mb-2 mr-2">
                    <input
                      type="radio"
                      id={`marca-${marca}`}
                      name="marca"
                      value={marca}
                      checked={selectedMarca === marca}
                      onChange={() => handleSelectMarca(marca)}
                      className="mr-1"
                    />
                    <label htmlFor={`marca-${marca}`} className="cursor-pointer p-2 rounded bg-white">
                      {marca}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {tallasRopa.length > 0 && (
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">Talla de Ropa</label>
                {tallasRopa.map((talla, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`tallaRopa-${talla}`}
                      name="tallaRopa"
                      value={talla}
                      checked={selectedTallaRopa === talla}
                      onChange={() => handleSelectTallaRopa(talla)}
                      className="mr-2"
                    />
                    <label htmlFor={`tallaRopa-${talla}`} className="text-gray-600 cursor-pointer">
                      {talla}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {tallasZapatilla.length > 0 && (
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">Talla de Zapatillas</label>
                <div className="overflow-auto max-h-32">
                  {tallasZapatilla
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .map((talla, index) => (
                      <div key={index} className="mb-2 mr-2">
                        <input
                          type="radio"
                          id={`tallaZapatilla-${talla}`}
                          name="tallaZapatilla"
                          value={talla}
                          checked={selectedTallaZapatilla === talla}
                          onChange={() => handleSelectTallaZapatilla(talla)}
                          className="mr-1"
                        />
                        <label
                          htmlFor={`tallaZapatilla-${talla}`}
                          className="cursor-pointer text-gray-600 p-2 rounded bg-white"
                        >
                          {talla}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Precio</label>
              <input
                type="number"
                value={precioMin}
                onChange={(e) => setPrecioMin(e.target.value)}
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
                placeholder="Min"
              />
              <input
                type="number"
                value={precioMax}
                onChange={(e) => setPrecioMax(e.target.value)}
                className="w-full p-2 mt-2 bg-gray-100 border border-gray-300 rounded"
                placeholder="Max"
              />
            </div>
            <div className="mt-4">
              <button
                onClick={handleSearch}
                className="w-full p-2 mb-2 text-white bg-red-500 rounded hover:bg-red-700"
              >
                Buscar
              </button>
              <button
                onClick={resetFilters}
                className="w-full p-2 text-white bg-red-500 rounded hover:bg-red-700"
              >
                Reiniciar Filtros
              </button>
            </div>

          </>

        )}

        <div className="mt-4">
          <h4 className="mb-1 font-semibold">Disponibilidad</h4>
          <div className="flex flex-col">
            <button
              onClick={() => handleSelectDisponibilidad("Entrega inmediata")}
              className={`p-2 rounded w-full ${selectedDisponibilidad === "Entrega inmediata"
                ? "bg-gray-600 text-white"
                : "bg-gray-300 text-black"
                } hover:bg-green-500 mb-1`}
            >
              Entrega inmediata
            </button>
            <button
              onClick={() => handleSelectDisponibilidad("Disponible en 3 días")}
              className={`p-2 rounded w-full ${selectedDisponibilidad === "Disponible en 3 días"
                ? "bg-gray-600 text-white"
                : "bg-gray-300 text-black"
                } hover:bg-yellow-500 mb-1`}
            >
              Disponible en 3 días
            </button>
            <button
              onClick={() => handleSelectDisponibilidad("Disponible en 15 días")}
              className={`p-2 rounded w-full ${selectedDisponibilidad === "Disponible en 15 días"
                ? "bg-gray-600 text-white"
                : "bg-gray-300 text-black"
                } hover:bg-red-500`}
            >
              Disponible en 15 días
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
