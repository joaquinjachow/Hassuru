import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

export default function SearchBar({ isHamburgerOpen }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Función para realizar la búsqueda
  const fetchProducts = async (searchQuery) => {
    try {
      const res = await fetch(`http://localhost:5000/api/productos/nombre/${searchQuery}?limit=10`);
      const data = await res.json();

      if (res.ok) {
        setFilteredProducts(data);
      } else {
        setFilteredProducts([]);
        console.error("Error al obtener productos:", data.error);
      }
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setFilteredProducts([]);
    }
  };

  const handleInputChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim()) {
      fetchProducts(searchQuery);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleSearch = () => {
    setQuery("");
    setFilteredProducts([]);
    setIsFocused(false);
  }


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!query) setIsFocused(false);
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Buscar..."
        className={`transition-all duration-300 ease-in-out p-2 border border-gray-300 outline-none ${
          isHamburgerOpen
            ? "w-40 opacity-100 rounded-l-md"
            : isFocused
            ? "w-40 opacity-100"
            : "w-0 opacity-0 p-0"
        }`}
      />
      <button
        type="button"
        className="p-2 text-gray-500"
        onClick={() => setIsFocused(true)}
      >
        <FaSearch />
      </button>

      {filteredProducts.length > 0 && (
        <ul className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-md">
          {filteredProducts.map((product) => (
            <li key={product._id} className="px-4 py-2 hover:bg-gray-100">
              <Link href={`/producto/${product._id}`}>
                <p onClick={handleSearch}>{product.nombre}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
