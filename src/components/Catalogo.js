import React, { useState, useEffect } from "react";
import Card from "./Card";

export default function Catalogo() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  const [selectedTallaRopa, setSelectedTallaRopa] = useState("");
  const [selectedTallaZapatilla, setSelectedTallaZapatilla] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [stockOnly, setStockOnly] = useState(false);
  const [availableIn15Days, setAvailableIn15Days] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/productos");
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      const data = await response.json();
      console.log(data); // Verifica la estructura de los datos
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts().then(() => {
      // Restablecer filtros al cargar productos
      setSelectedTallaRopa("");
      setSelectedTallaZapatilla("");
      setPrecioMin("");
      setPrecioMax("");
      setStockOnly(false);
      setAvailableIn15Days(false);
    });
  }, []);

  const handleTallaRopaFilter = (e) => {
    setSelectedTallaRopa(e.target.value);
  };

  const handleTallaZapatillaFilter = (e) => {
    setSelectedTallaZapatilla(e.target.value);
  };

  const handlePrecioMinFilter = (e) => {
    setPrecioMin(e.target.value);
  };

  const handlePrecioMaxFilter = (e) => {
    setPrecioMax(e.target.value);
  };

  const handleStockOnlyChange = () => {
    setStockOnly(!stockOnly);
    setAvailableIn15Days(false);
  };

  const handleAvailableIn15DaysChange = () => {
    setAvailableIn15Days(!availableIn15Days);
    setStockOnly(false);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset page to 1 on search
  };

  useEffect(() => {
    let filtered = products;

    // Filtrar por talla de ropa si está seleccionada
    if (selectedTallaRopa) {
      filtered = filtered.filter((product) =>
        product.tallasRopa && product.tallasRopa[selectedTallaRopa] === true // Asegúrate de que sea true
      );
    }

    // Filtrar por talla de zapatillas si está seleccionada
    if (selectedTallaZapatilla) {
      filtered = filtered.filter((product) =>
        product.tallasZapatilla &&
        product.tallasZapatilla[selectedTallaZapatilla] > 0 // Comprobar si hay stock disponible
      );
    }

    // Filtrar por precio mínimo y máximo
    if (precioMin || precioMax) {
      filtered = filtered.filter((product) => {
        const precio = product.precios.USD;
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

    // Filtrar por stock
    if (stockOnly) {
      filtered = filtered.filter((product) =>
        product.tallas && Object.keys(product.tallas).length > 0
      );
    }

    // Filtrar por disponibilidad en 15 días
    if (availableIn15Days) {
      filtered = filtered.filter((product) =>
        product.tallas && Object.keys(product.tallas).length === 0
      );
    }

    console.log(filtered); // Verifica los productos filtrados
    // Ordenar productos por precio
    filtered.sort((a, b) => a.precios.USD - b.precios.USD);

    setFilteredProducts(filtered);
  }, [selectedTallaRopa, selectedTallaZapatilla, precioMin, precioMax, stockOnly, availableIn15Days, products]);

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Renderización del componente
  return (
    <div className="container flex py-10 mx-auto">
      {/* Columna para filtros */}
      <aside className="w-1/4 px-4">
        <div className="mb-4">
          <h3 className="mb-3 text-xl font-semibold">Filtros</h3>
          {/* Filtro por tallas de ropa */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Talla de Ropa</label>
            <select
              value={selectedTallaRopa}
              onChange={handleTallaRopaFilter}
              className="w-full p-2 bg-transparent border border-gray-300 rounded"
            >
              <option value="">Todas las tallas</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
          {/* Filtro por tallas de zapatillas */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Talla de Zapatillas</label>
            <select
              value={selectedTallaZapatilla}
              onChange={handleTallaZapatillaFilter}
              className="w-full p-2 bg-transparent border border-gray-300 rounded"
            >
              <option value="">Todas las tallas</option>
              {Array.from({ length: 18 }, (_, index) => (
                <option key={index} value={(35.5 + index * 0.5).toFixed(1)}>
                  {(35.5 + index * 0.5).toFixed(1)}
                </option>
              ))}
            </select>
          </div>
          {/* Filtro por rango de precio */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Precio mínimo (USD)</label>
            <input
              type="number"
              value={precioMin}
              onChange={handlePrecioMinFilter}
              className="w-full p-2 bg-transparent border border-gray-300 rounded"
              placeholder="Ej: 50"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Precio máximo (USD)</label>
            <input
              type="number"
              value={precioMax}
              onChange={handlePrecioMaxFilter}
              className="w-full p-2 bg-transparent border border-gray-300 rounded"
              placeholder="Ej: 100"
            />
          </div>
          {/* Filtro por stock */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleStockOnlyChange}
              className={`w-full ${stockOnly ? "bg-red-500 text-white" : "bg-gray-200"} p-2 rounded`}
            >
              Solo en stock
            </button>
            <button
              onClick={handleAvailableIn15DaysChange}
              className={`w-full ${availableIn15Days ? "bg-red-500 text-white" : "bg-gray-200"} p-2 rounded`}
            >
              Disponible en 15 días
            </button>
          </div>
          {/* Botón de buscar */}
          <button onClick={handleSearch} className="w-full p-2 text-white bg-red-500 rounded">
            Buscar
          </button>
        </div>
      </aside>

      {/* Columna para el catálogo de productos */}
      <section className="w-3/4">
        {loading ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p> // Mostrar error si lo hay
        ) : currentProducts.length === 0 ? (
          <p>No hay productos disponibles.</p> // Mostrar mensaje si no hay productos
        ) : (
          <Card currentProducts={currentProducts}/>
        )}
      </section>
    </div>
  );
}
