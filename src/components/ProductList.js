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
    if (categoriaFilter) { // Verifica que haya una categoría seleccionada
      await fetchProductsFiltered(categoriaFilter); // Solo filtra por categoría
    }
  };

  // Función para remover filtros
  const handleRemoveFilters = () => {
    setCategoriaFilter(""); // Limpia el filtro de categoría
    fetchProducts(); // Llama a fetchProducts para cargar todos los productos nuevamente
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-black">Lista de Productos</h2>

      {/* Formulario de Filtros */}
      <form onSubmit={handleFilterSubmit} className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        {/* Select para Categoría */}
        <select
          value={categoriaFilter}
          onChange={(e) => setCategoriaFilter(e.target.value)}
          className="border rounded p-2 w-full sm:w-auto"
        >
          <option value="">Seleccione una categoría</option>
          <option value="zapatillas">Zapatillas</option>
          <option value="ropa">Ropa</option>
          <option value="accesorios">Accesorios</option>
        </select>

        {/* Botón Filtrar */}
        <button 
          type="submit" 
          className="bg-blue-500 text-white rounded p-2 w-full sm:w-auto"
        >
          Filtrar
        </button>

        {/* Botón para remover filtros */}
        <button 
          type="button" 
          onClick={handleRemoveFilters} 
          className="bg-red-500 text-white rounded p-2 w-full sm:w-auto text-center"
        >
          <MdFilterAltOff className="mr-1 hidden sm:inline-block" /> Remover Filtros
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
