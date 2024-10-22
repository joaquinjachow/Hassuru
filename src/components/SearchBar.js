  import React, { useState } from "react";
  import { FaSearch } from "react-icons/fa";
  import Link from "next/link";
  import { useRouter } from "next/router"; // Importar useRouter para redirección

  export default function SearchBar({ isHamburgerOpen }) {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const router = useRouter(); // Inicializa useRouter

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
      if (query.trim()) {
        // Redireccionar al catálogo con la consulta
        router.push(`/catalogo?search=${encodeURIComponent(query)}`);
      }
      // Limpiar los estados
      setQuery("");
      setFilteredProducts([]);
      setIsFocused(false);
    };

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevenir el comportamiento por defecto del Enter
        handleSearch(); // Ejecutar búsqueda al presionar Enter
      }
    };

    const handleToggleFocus = () => {
      setIsFocused(!isFocused);
      if (isFocused) {
        setQuery("");
        setFilteredProducts([]);
      }
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
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress} // Agregar el manejador de eventos de teclado
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
          onClick={handleToggleFocus}
        >
          <FaSearch />
        </button>

        {filteredProducts.length > 0 && isFocused && (
          <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md shadow-md top-12 z-50">
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
