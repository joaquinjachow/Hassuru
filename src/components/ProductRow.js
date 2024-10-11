// components/ProductRow.js
import React, { useState, useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoAddCircleOutline } from "react-icons/io5";
import useFetchDolar from "@/hooks/useFetchDolar";

const ProductRow = ({ 
  producto, 
  index,  //índice del producto en la lista
  selectedProduct, // ID del producto seleccionado
  handleProductSelect, // Manejador de selección de producto
  editableProducts, // Lista de productos editable
  setEditableProducts, // Manejador de cambios en la lista editable
  fetchProducts, // Función para recargar la lista editable
  setSelectedProduct,
}) => {

  const [newTalla, setNewTalla] = useState(""); // Para la nueva talla
  const [newStock, setNewStock] = useState(0);  // Para el stock de la nueva talla
  const [newColor, setNewColor] = useState(""); // Para el nuevo color
  const { dolarBlue, loading, error } = useFetchDolar();



  // Función para actualizar las tallas
  const handleTallaChange = (e, talla) => {
    const updatedProducts = [...editableProducts];
    updatedProducts[index].tallas[talla] = e.target.value;
    setEditableProducts(updatedProducts);
  };

  // Función para agregar una nueva talla
  const handleAddTalla = () => {
    if (newTalla && newStock > 0) {
      const updatedProducts = [...editableProducts];
      updatedProducts[index].tallas[newTalla] = newStock; // Agregar nueva talla
      setEditableProducts(updatedProducts);
      setNewTalla(""); // Limpiar input de talla
      setNewStock(0);  // Limpiar input de stock
    } else {
      alert("Por favor ingresa un nombre de talla válido y un stock mayor a 0.");
    }
  };

  // Función para eliminar una talla
  const handleDeleteTalla = (talla) => {
    const updatedProducts = [...editableProducts];
    delete updatedProducts[index].tallas[talla]; // Eliminar la talla
    setEditableProducts(updatedProducts);
  };

  // Función para manejar cambios en los colores
  const handleColorChange = (e, colorId) => {
    const updatedProducts = [...editableProducts];
    const colorIndex = updatedProducts[index].colores.findIndex(c => c._id === colorId);
    if (colorIndex !== -1) {
      updatedProducts[index].colores[colorIndex].color = e.target.value;
      setEditableProducts(updatedProducts);
    }
  };

  // Función para agregar un nuevo color
  const handleAddColor = () => {
    if (newColor) {
      const updatedProducts = [...editableProducts];
      // Agregamos un objeto color con solo el nombre. Deja que el backend maneje el _id
      updatedProducts[index].colores.push({ color: newColor });
      setEditableProducts(updatedProducts);
      setNewColor(""); // Limpiar input de color
    } else {
      alert("Por favor ingresa un color válido.");
    }
  };

  // Función para eliminar un color
  const handleDeleteColor = (colorId) => {
    const updatedProducts = [...editableProducts];
    updatedProducts[index].colores = updatedProducts[index].colores.filter(c => c._id !== colorId);
    setEditableProducts(updatedProducts);
  };

  const handleProductUpdate = async (producto) => {
    const updatedProduct = {
      ...producto,
      categoria: producto.categoria, // Agregar la categoría al objeto actualizado
    };
  
    const response = await fetch(`http://localhost:5000/api/productos/${producto._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedProduct),
    });
  
    if (response.ok) {
      alert('Producto actualizado con éxito'); // Mostrar alerta
      fetchProducts(); // Recarga los productos
      setSelectedProduct(null); // Deseleccionar el producto
    } else {
      alert('Error al actualizar el producto'); // Agrega alerta en caso de error
      console.error('Error al actualizar el producto');
    }
  };

 const handleProductDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro que quieres eliminar este producto?");
    if (confirmDelete) {
      const response = await fetch(`http://localhost:5000/api/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        alert('Producto eliminado con èxito');
        fetchProducts(); // Recarga los productos
      } else { 
        console.error('Error al eliminar el producto');
      }
    }
  };

  const handleProductChange = (e, field, index) => {
    const updatedProducts = [...editableProducts];
    const newValue = e.target.value;

  // Verificar si el producto en el índice existe
  if (!updatedProducts[index]) {
    console.error(`Producto en el índice ${index} no existe.`);
    return; 
  }
  
    // Verificar si el campo es uno de los precios
    if (field.includes('precios')) {
      const [priceType, priceKey] = field.split('.'); // Obtiene 'precios' y 'USD' o 'AR'

      updatedProducts[index][priceType][priceKey] = newValue;
    } else if (field === 'categoria') {
      // Manejar la categoría directamente
      updatedProducts[index][field] = newValue; // Asignar el nuevo valor a la categoría
    } else {
      if (!updatedProducts[index][field]) {
        updatedProducts[index][field] = ''; // Inicializar con un valor vacío si no existe
      }
      updatedProducts[index][field] = newValue; // Manejar otros campos
    }
  
    setEditableProducts(updatedProducts);
    console.log(`Productos actualizados:`, updatedProducts);
  };

  // Función para manejar el cambio de estado de "destacado"
  const handleDestacadoChange = (e) => {
    const updatedProducts = [...editableProducts];
    updatedProducts[index].destacado = e.target.checked; 
    setEditableProducts(updatedProducts);
  };

  const handleDestacadoZapatillasChange = (e) => {
    const updatedProducts = [...editableProducts];
    updatedProducts[index].destacado_zapatillas = e.target.checked; 
    setEditableProducts(updatedProducts);
  };

   // Función para manejar el cambio de estado de "encargo"
  const handleEncargoChange = (e) => {
    const updatedProducts = [...editableProducts];
    updatedProducts[index].encargo = e.target.checked; 
    setEditableProducts(updatedProducts);
  };

  return (
    <tr className="text-gray-600 overflow-x-auto">
      <td className="border px-4 py-2">
        <input
          type="radio"
          name="selectedProduct"
          onChange={() => handleProductSelect(producto._id)}
          checked={selectedProduct === producto._id}
        />
      </td>
      <td className="border px-2 py-2">
        {selectedProduct === producto._id ? (
          <input
            type="text"
            value={producto.nombre}
            onChange={(e) => handleProductChange(e, "nombre", index)}
            className="border p-1 w-full"
          />
        ) : (
          producto.nombre
        )}
      </td>
      <td className="border px-2 py-2">
        {selectedProduct === producto._id ? (
          <input
            type="text"
            value={producto.descripcion}
            onChange={(e) => handleProductChange(e, "descripcion", index)}
            className="border p-1 w-full"
          />
        ) : (
          producto.descripcion
        )}
      </td>
      <td className="border px-2 py-2">
        {selectedProduct === producto._id ? (
          <input
            type="text"
            value={producto.marca}
            onChange={(e) => handleProductChange(e, "marca", index)}
            className="border p-1 w-full"
          />
        ) : (
          producto.marca
        )}
      </td>
      <td className="border px-2 py-2">
        {selectedProduct === producto._id ? (
          <select
            value={producto.categoria}
            onChange={(e) => handleProductChange(e, "categoria", index)}
            className="border p-1 w-full"
          >
            <option value="ropa">Ropa</option>
            <option value="accesorios">Accesorios</option>
            <option value="zapatillas">Zapatillas</option>
          </select>
        ) : (
          producto.categoria
        )}
      </td>
      <td className="border px-2 py-2">
        {selectedProduct === producto._id ? (
          <div className="flex flex-col">
            <input
              type="text"
              value={producto.precios.USD}
              onChange={(e) => handleProductChange(e, "precios.USD", index)}
              className="border p-1 mb-2 w-full"
              placeholder="Precio en USD"
            />
            {dolarBlue ? (
              <input
                type="text"
                value={(producto.precios.USD * dolarBlue).toFixed(2)}
                readOnly
                className="border p-1 w-full"
                placeholder="Precio en ARS"
              />
            ) : (
              <p>Cargando cotización...</p>
            )}
          </div>
        ) : (
          <div>
            <p>{producto.precios.USD} USD</p>
            {dolarBlue ? (
              <p>{(producto.precios.USD * dolarBlue).toFixed(2)} ARS</p>
            ) : (
              <p>Cargando cotización...</p>
            )}
          </div>
        )}
      </td>
      {/* Edición de tallas y stock */}
      <td className="border px-2 py-2">
        {selectedProduct === producto._id ? (
          <div>
            {Object.entries(producto.tallas).map(([talla, cantidad]) => (
              <div key={talla} className="flex flex-col sm:flex-row items-center mb-1">
                <input 
                  type="text" 
                  value={talla} 
                  readOnly 
                  className="border p-1 mr-2 w-full sm:w-1/3 mb-2 sm:mb-0" 
                />
                <input 
                  type="number" 
                  value={cantidad} 
                  onChange={(e) => handleTallaChange(e, talla)} 
                  className="border p-1 mr-2 w-full sm:w-1/3 mb-2 sm:mb-0" 
                />
                <button 
                  onClick={() => handleDeleteTalla(talla)} 
                  className="bg-red-500 text-white px-2 py-1 ml-0 sm:ml-2 mt-2 sm:mt-0 rounded"
                >
                  <RiDeleteBin5Line />
                </button>
              </div>
            ))}

            <div className="mt-2 flex flex-col sm:flex-row">
              <input 
                type="text" 
                value={newTalla} 
                onChange={(e) => setNewTalla(e.target.value)} 
                placeholder="Nueva talla" 
                className="border p-1 mr-2 w-full sm:w-1/3 mb-2 sm:mb-0" 
              />
              <input 
                type="number" 
                value={newStock} 
                onChange={(e) => setNewStock(e.target.value)} 
                placeholder="Stock" 
                className="border p-1 w-full sm:w-1/3" 
              />
              <button 
                onClick={handleAddTalla} 
                className="bg-blue-500 text-white px-2 py-1 ml-0 sm:ml-2 mt-2 sm:mt-0 rounded"
              >
                <IoAddCircleOutline />
              </button>
            </div>
          </div>
        ) : (
          <div>
            {Object.entries(producto.tallas).map(([talla, cantidad]) => (
              <div key={talla}>
                {talla}: {cantidad}
              </div>
            ))}
          </div>
        )}
      </td>

      {/* Edición de colores */}
      <td className="border px-2 py-2">
        {selectedProduct === producto._id ? (
          <div>
            {producto.colores.map(color => (
              <div key={color._id} className="flex items-center mb-1">
                <input 
                  type="text" 
                  value={color.color} 
                  onChange={(e) => handleColorChange(e, color._id)} 
                  className="border p-1 w-1/2" 
                />
                <button 
                  onClick={() => handleDeleteColor(color._id)} 
                  className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
                >
                  <RiDeleteBin5Line />
                </button>
              </div>
            ))}

            <div className="mt-2">
              <input 
                type="text" 
                value={newColor} 
                onChange={(e) => setNewColor(e.target.value)} 
                placeholder="Nuevo color" 
                className="border p-1 mr-2 w-1/2" 
              />
              <button 
                onClick={handleAddColor} 
                className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
              >
                <IoAddCircleOutline />
              </button>
            </div>
          </div>
        ) : (
          <div>
            {producto.colores.map(color => (
              <div key={color._id}>{color.color}</div>
            ))}
          </div>
        )}
      </td>
      <td className="border px-4 py-2">
        {producto.image?.url && (
          <img src={producto.image.url} alt={producto.nombre} className="w-16 h-16 object-cover" />
        )}
      </td>

      {/* Switch para destacado */}
      <td className="border px-2 py-2">
        {selectedProduct === producto._id ? (
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={producto.destacado}
            onChange={handleDestacadoChange}
            className="mr-2"
          />
          Destacado
        </label>
        ) : (
          producto.destacado ? "Sí" : "No"
        )}
      </td>
      {/* Switch para destacado zapatillas*/}
      <td className="border px-2 py-2">
        {selectedProduct === producto._id ? (
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={producto.destacado_zapatillas}
            onChange={handleDestacadoZapatillasChange}
            className="mr-2"
          />
          Destacado Zapatillas
        </label>
        ) : (
          producto.destacado_zapatillas ? "Sí" : "No"
        )}
      </td>
      {/* Switch para encargo */}
      <td className="border px-2 py-2">
        {selectedProduct === producto._id ? (
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={producto.encargo}
            onChange={handleEncargoChange}
            className="mr-2"
          />
          Encargo
        </label>
        ) : (
          producto.encargo ? "Sí" : "No"
        )}
      </td>
      <td className="border px-2 py-2 text-center">
        {selectedProduct === producto._id && (
          <button 
            onClick={() => handleProductUpdate(producto)} 
            className="bg-blue-500 text-white px-2 py-1 mb-1 rounded"
          >
            Guardar
          </button>
        )}
        <button 
          onClick={() => handleProductDelete(producto._id)} 
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
