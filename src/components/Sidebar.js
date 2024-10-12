// components/Sidebar.js
import React, { useState } from "react";
import AddProductModal from './AddProductModal'; // Importa el componente del modal

const Sidebar = ({ handleLogout, fetchProducts, categoriasDisponibles }) => {
  const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar el modal

  return (
    <aside className="w-64 bg-gray-800 text-white lg:flex flex-col justify-between hidden">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Panel</h1>
        <ul>
          <li className="mb-4">
            <button
              onClick={() => setModalOpen(true)} // Abre el modal al hacer clic
              className="block w-full py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
            >
              Agregar Producto
            </button>
          </li>
        </ul>
      </div>
      <div className="p-6">
        <button
          onClick={handleLogout}
          className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-300 w-full text-left text-red-500"
        >
          Logout
        </button>
      </div>

      {/* Integración del modal */}
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
