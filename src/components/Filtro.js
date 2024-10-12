import { useEffect, useState } from "react";

export default function Filter({ products, setFilteredProducts }) {
  const [selectedTallaRopa, setSelectedTallaRopa] = useState("");
  const [selectedTallaZapatilla, setSelectedTallaZapatilla] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [stockOnly, setStockOnly] = useState(false);
  const [availableIn15Days, setAvailableIn15Days] = useState(false);
  const [tallasRopa, setTallasRopa] = useState([]);
  const [tallasZapatilla, setTallasZapatilla] = useState([]);

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

    if (availableIn15Days) {
      filtered = filtered.filter((product) =>
        Object.values(product.tallas).every((stock) => stock <= 0)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedTallaRopa, selectedTallaZapatilla, stockOnly, availableIn15Days, products]);

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

    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setSelectedTallaRopa("");
    setSelectedTallaZapatilla("");
    setPrecioMin("");
    setPrecioMax("");
    setStockOnly(false);
    setAvailableIn15Days(false);
    setFilteredProducts(products);
  };

  return (
    <main className="px-4 font-semibold md:px-12">
      <div className="mb-4">
        <h3 className="mb-3 text-xl font-semibold">Filtros</h3>

        <div className="mb-4">
          {selectedTallaRopa && (
            <div className="flex items-center mb-2">
              <span className="mr-2">Talla de Ropa: {selectedTallaRopa}</span>
              <button onClick={() => setSelectedTallaRopa("")} className="text-red-500">
                X
              </button>
            </div>
          )}

          {selectedTallaZapatilla && (
            <div className="flex items-center mb-2">
              <span className="mr-2">Talla de Zapatillas: {selectedTallaZapatilla}</span>
              <button onClick={() => setSelectedTallaZapatilla("")} className="text-red-500">
                X
              </button>
            </div>
          )}

          {stockOnly && (
            <div className="flex items-center mb-2">
              <span className="mr-2">Solo en stock</span>
              <button onClick={() => setStockOnly(false)} className="text-red-500">
                X
              </button>
            </div>
          )}

          {availableIn15Days && (
            <div className="flex items-center mb-2">
              <span className="mr-2">Disponible en 15 días</span>
              <button onClick={() => setAvailableIn15Days(false)} className="text-red-500">
                X
              </button>
            </div>
          )}
        </div>

        {tallasRopa.length > 0 && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Talla de Ropa</label>
            <select
              value={selectedTallaRopa}
              onChange={(e) => setSelectedTallaRopa(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded"
            >
              <option value="">Todas las tallas</option>
              {tallasRopa.map((talla, index) => (
                <option value={talla} key={index}>
                  {talla}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Mostrar solo si hay tallas de zapatillas */}
        {tallasZapatilla.length > 0 && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Talla de Zapatillas</label>
            <select
              value={selectedTallaZapatilla}
              onChange={(e) => setSelectedTallaZapatilla(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-300 rounded"
            >
              <option value="">Todas las tallas</option>
              {tallasZapatilla.map((talla, index) => (
                <option value={talla} key={index}>
                  {talla}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Precio mínimo (USD)</label>
          <input
            type="number"
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
            className="w-full p-2 bg-transparent border border-gray-300 rounded"
            placeholder="Ej: 50"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Precio máximo (USD)</label>
          <input
            type="number"
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
            className="w-full p-2 bg-transparent border border-gray-300 rounded"
            placeholder="Ej: 100"
          />
        </div>

        <button onClick={handleSearch} className="w-full p-2 text-white bg-red-500 rounded">
          Buscar
        </button>

        <button onClick={resetFilters} className="w-full p-2 mt-2 text-white bg-black rounded">
          Resetear Filtros
        </button>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => {
              setStockOnly(true);
              setAvailableIn15Days(false);
            }}
            className={`w-full ${stockOnly ? "bg-black text-white " : " bg-red-500 text-white"} p-2 rounded`}
          >
            Solo en stock
          </button>
          <button
            onClick={() => {
              setStockOnly(false);
              setAvailableIn15Days(true);
            }}
            className={`w-full ${availableIn15Days ? "bg-black text-white" : " bg-red-500 text-white"} p-2 rounded`}
          >
            Disponible en 15 días
          </button>
        </div>
      </div>
    </main>
  );
}
