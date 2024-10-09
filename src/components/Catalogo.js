import React, { useState, useEffect } from "react";
import Card from "./Card";

export default function Catalogo() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  const [selectedTalla, setSelectedTalla] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [selectedMarca, setSelectedMarca] = useState("");
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
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleTallaFilter = (e) => {
    setSelectedTalla(e.target.value);
  };

  const handlePrecioMinFilter = (e) => {
    setPrecioMin(e.target.value);
  };

  const handlePrecioMaxFilter = (e) => {
    setPrecioMax(e.target.value);
  };

  const handleMarcaFilter = (e) => {
    setSelectedMarca(e.target.value);
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

    if (selectedTalla) {
      filtered = filtered.filter((product) =>
        Object.keys(product.tallas).includes(selectedTalla)
      );
    }

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

    if (selectedMarca) {
      filtered = filtered.filter((product) => product.marca === selectedMarca);
    }

    if (stockOnly) {
      filtered = filtered.filter((product) =>
        product.tallas && Object.keys(product.tallas).length > 0
      );
    }

    if (availableIn15Days) {
      filtered = filtered.filter((product) =>
        product.tallas && Object.keys(product.tallas).length === 0
      );
    }

    // Order products by price
    filtered.sort((a, b) => a.precios.USD - b.precios.USD);

    setFilteredProducts(filtered);
  }, [selectedTalla, precioMin, precioMax, selectedMarca, stockOnly, availableIn15Days, products]);

  // Pagination logic
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
          {/* Filtro por tallas */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Talla</label>
            <select
              value={selectedTalla}
              onChange={handleTallaFilter}
              className="w-full p-2 bg-transparent border border-gray-300 rounded"
            >
              <option value="">Todas las tallas</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
              <option value="43">43</option>
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
          {/* Filtro por marcas */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Marca</label>
            <select
              value={selectedMarca}
              onChange={handleMarcaFilter}
              className="w-full p-2 bg-transparent border border-gray-300 rounded"
            >
              <option value="">Todas las marcas</option>
              <option value="Marca1">Marca1</option>
              <option value="Marca2">Marca2</option>
              <option value="Marca3">Marca3</option>
            </select>
          </div>
          {/* Filtro por stock */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleStockOnlyChange}
              className={`w-full ${
                stockOnly ? "bg-blue-500 text-white" : "bg-gray-200"
              } p-2 rounded`}
            >
              Solo en stock
            </button>
            <button
              onClick={handleAvailableIn15DaysChange}
              className={`w-full ${
                availableIn15Days ? "bg-blue-500 text-white" : "bg-gray-200"
              } p-2 rounded`}
            >
              Disponible en 15 días
            </button>
          </div>
          {/* Botón de buscar */}
          <button onClick={handleSearch} className="w-full p-2 text-white bg-blue-500 rounded">
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

        {/* Paginación */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded mx-1 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
