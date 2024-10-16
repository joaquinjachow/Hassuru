import React, { useState, useEffect } from "react";
import ProductRow from "./ProductRow";
import { MdFilterAltOff } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import AddProductModal from './AddProductModal'; 
import useStore from "@/store/store";

const ProductList = ({ editableProducts, setEditableProducts, selectedProduct, setSelectedProduct, fetchProducts, fetchProductsFiltered }) => {
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const { dolarBlue, fetchDolarBlue } = useStore();
  const [isModalOpen, setModalOpen] = useState(false);
  
  useEffect(() => {
    fetchDolarBlue();
  }, [fetchDolarBlue]);

  const handleProductSelect = (id) => {
    setSelectedProduct(id);
  };

  const handleRemoveFilters = () => {
    setCategoriaFilter(""); 
    setNameFilter("");
    fetchProducts(); 
  };

  const filteredProducts = editableProducts.filter((producto) => {
    const nameMatch = producto.nombre.toLowerCase().includes(nameFilter.toLowerCase());
    const categoryMatch = categoriaFilter ? producto.categoria === categoriaFilter : true;
    return nameMatch && categoryMatch;
  });
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-xl font-semibold text-black">Lista de Productos</h2>

      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center p-3 mb-4 text-white transition duration-200 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 lg:hidden"
      >
        <MdAdd className="mr-2" />
        Agregar Producto
      </button>


      {/* Formulario de Filtros */}
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center gap-4 mb-6 sm:flex-row">
        
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="w-full p-2 border rounded sm:w-auto"
        />
        <select
          value={categoriaFilter}
          onChange={(e) => setCategoriaFilter(e.target.value)}
          className="w-full p-2 border rounded sm:w-auto"
        >
          <option value="">Seleccione una categoría</option>
          <option value="zapatillas">Zapatillas</option>
          <option value="ropa">Ropa</option>
          <option value="accesorios">Accesorios</option>
        </select>

        <button 
          type="button" 
          onClick={handleRemoveFilters} 
          className="w-full p-2 text-center text-white bg-red-500 rounded sm:w-auto"
        >
          <MdFilterAltOff className="inline-block mr-1" /> 
          <span className="hidden md:inline-block">Remover Filtros</span>
        </button>

        <div className="flex items-center p-2 text-center bg-blue-100 rounded sm:w-auto">
          <span className="hidden mr-2 text-lg font-bold text-green-500 md:inline-block">Dólar Blue:</span>
          <span className="text-lg font-semibold">${dolarBlue}</span>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="text-base">
            <tr className="text-gray-700 bg-gray-100">
              <th className="px-2 py-2">Seleccionar</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Marca</th>
              <th className="px-4 py-2">Categoría</th>
              <th className="px-4 py-2">Precios (USD/AR)</th>
              <th className="px-4 py-2">Tallas (Stock)</th>
              <th className="px-4 py-2">Colores</th>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Destacado</th>
              <th className="px-4 py-2">Destacado Z</th>
              <th className="px-4 py-2">Encargo</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((producto, index) => (
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

      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
};

export default ProductList;
