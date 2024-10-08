// components/ProductList.js
import React, { useState } from "react";
import ProductRow from "./ProductRow"; // Importa el componente ProductRow
import { MdFilterAltOff } from "react-icons/md";

const ProductList = ({ editableProducts, setEditableProducts, selectedProduct, setSelectedProduct, fetchProducts, fetchProductsFiltered }) => {
  const [marcaFilter, setMarcaFilter] = useState(""); // Estado para la marca
  const [categoriaFilter, setCategoriaFilter] = useState(""); // Estado para la categoría
  const handleProductSelect = (id) => {
    setSelectedProduct(id);
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault(); // Evitar que la página se recargue
    // Llamar a la función fetchProducts con los filtros
    await fetchProductsFiltered({ marca: marcaFilter, categoria: categoriaFilter });
  };

  // Función para remover filtros
  const handleRemoveFilters = () => {
    setMarcaFilter("");
    setCategoriaFilter("");
    fetchProducts(); // Llama a fetchProducts para cargar todos los productos nuevamente
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-black">Lista de Productos</h2>

      {/* Formulario de Filtros */}
      <form onSubmit={handleFilterSubmit} className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Marca"
          value={marcaFilter}
          onChange={(e) => setMarcaFilter(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="Categoría"
          value={categoriaFilter}
          onChange={(e) => setCategoriaFilter(e.target.value)}
          className="border rounded p-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-2">
          Filtrar
        </button>

        {/* Botón para remover filtros */}
        <button 
          type="button" 
          onClick={handleRemoveFilters} 
          className="flex items-center bg-red-500 text-white rounded p-2 ml-2"
        >
          <MdFilterAltOff className="mr-1" /> Remover Filtros
        </button>
      </form>

      {/* {loading && <p>Cargando...</p>} Mensaje de carga */}

      {/* Tabla de Productos */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead className="text-base">
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-2 py-2">Seleccionar</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Marca</th>
              <th className="px-4 py-2">Categoría</th>
              <th className="px-4 py-2">Precios (USD/AR)</th>
              <th className="px-4 py-2">Tallas (Stock)</th>
              <th className="px-4 py-2">Colores</th>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {editableProducts.map((producto, index) => (
              <ProductRow 
                key={producto._id}
                producto={producto}
                index={index}
                selectedProduct={selectedProduct}
                handleProductSelect={handleProductSelect}
                setEditableProducts={setEditableProducts}
                fetchProducts={fetchProducts}
                editableProducts={editableProducts}
                setSelectedProduct={setSelectedProduct}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
