import React, { useState } from "react";
import AddProductModal from './AddProductModal';

const Sidebar = ({ handleLogout, fetchProducts, categoriasDisponibles }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <aside className="flex-col justify-between hidden w-64 text-white bg-gray-800 lg:flex">
      <div className="p-6">
        <h1 className="mb-6 text-3xl font-bold">Dashboard Panel</h1>
        <ul>
          <li className="mb-4">
            <button
              onClick={() => setModalOpen(true)}
              className="block w-full px-4 py-2 text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
            >
              Agregar Producto
            </button>
          </li>
        </ul>
      </div>
      <div className="p-6">
        <button
          onClick={handleLogout}
          className="block w-full px-4 py-2 text-left text-red-500 transition duration-300 rounded hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        fetchProducts={fetchProducts}
        categorias={categoriasDisponibles}
      />
    </aside>
  );
};

export default Sidebar;
