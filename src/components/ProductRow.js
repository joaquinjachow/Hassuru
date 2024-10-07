// components/ProductRow.js
import React, { useState } from "react";

const ProductRow = ({ 
  producto, 
  index,  //índice del producto en la lista
  selectedProduct, // ID del producto seleccionado
  handleProductSelect, // Manejador de selección de producto
  editableProducts, // Lista de productos editable
  setEditableProducts, // Manejador de cambios en la lista editable
  fetchProducts, // Función para recargar la lista editable
  setSelectedProduct // Manejador de selección de producto
}) => {

  const [newTalla, setNewTalla] = useState(""); // Para la nueva talla
  const [newStock, setNewStock] = useState(0);  // Para el stock de la nueva talla
  const [newColor, setNewColor] = useState(""); // Para el nuevo color

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
    const response = await fetch(`http://localhost:5000/api/productos/${producto._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(producto),
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
        toast.success('Producto eliminado con éxito'); // Mostrar mensaje de éxito
        fetchProducts(); // Recarga los productos
      } else {
        toast.error('Error al eliminar el producto'); // Mostrar mensaje de error
        console.error('Error al eliminar el producto');
      }
    }
  };

  const handleProductChange = (e, field) => {
    const updatedProducts = [...editableProducts]; // Asegúrate de que editableProducts esté definido
    if (field.includes('precios')) {
      const [priceType, priceKey] = field.split('.'); // Obtiene 'precios' y 'USD' o 'AR'
      updatedProducts[index][priceType][priceKey] = e.target.value;
    } else {
      updatedProducts[index][field] = e.target.value;
    }
    setEditableProducts(updatedProducts);
  };

  return (
    <tr className="text-gray-600">
      <td className="border px-4 py-2">
        <input
          type="radio"
          name="selectedProduct"
          onChange={() => handleProductSelect(producto._id)}
          checked={selectedProduct === producto._id}
        />
      </td>
      <td className="border px-4 py-2">
        {selectedProduct === producto._id ? (
          <input
            type="text"
            value={producto.nombre}
            onChange={(e) => handleProductChange(e, "nombre")}
            className="border p-1"
          />
        ) : (
          producto.nombre
        )}
      </td>
      <td className="border px-4 py-2">
        {selectedProduct === producto._id ? (
          <input
            type="text"
            value={producto.descripcion}
            onChange={(e) => handleProductChange(e, "descripcion")}
            className="border p-1"
          />
        ) : (
          producto.descripcion
        )}
      </td>
      <td className="border px-4 py-2">
        {selectedProduct === producto._id ? (
          <input
            type="text"
            value={producto.categoria}
            onChange={(e) => handleProductChange(e, "categoria")}
            className="border p-1"
          />
        ) : (
          producto.categoria
        )}
      </td>
      <td className="border px-4 py-2">
        {selectedProduct === producto._id ? (
          <div>
            <input
              type="text"
              value={producto.precios.USD}
              onChange={(e) => handleProductChange(e, "precios.USD")}
              className="border p-1 mb-1 w-1/3 block"
              placeholder="Precio en USD"
            />
            <input
              type="text"
              value={producto.precios.AR}
              onChange={(e) => handleProductChange(e, "precios.AR")}
              className="border p-1 w-1/3 block"
              placeholder="Precio en ARS"
            />
          </div>
        ) : (
          <div>
            <p>{producto.precios.USD} USD</p>
            <p>{producto.precios.AR} ARS</p>
          </div>
        )}
      </td>
      {/* Edición de tallas y stock */}
      <td className="border px-4 py-2">
        {selectedProduct === producto._id ? (
          <div>
            {Object.entries(producto.tallas).map(([talla, cantidad]) => (
              <div key={talla} className="flex items-center">
                <input 
                  type="text" 
                  value={talla} 
                  readOnly 
                  className="border p-1 mr-2 w-1/4" 
                />
                <input 
                  type="number" 
                  value={cantidad} 
                  onChange={(e) => handleTallaChange(e, talla)} 
                  className="border p-1 w-1/4" 
                />
                <button 
                  onClick={() => handleDeleteTalla(talla)} 
                  className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
                >
                  Eliminar
                </button>
              </div>
            ))}

            <div className="mt-2">
              <input 
                type="text" 
                value={newTalla} 
                onChange={(e) => setNewTalla(e.target.value)} 
                placeholder="Nueva talla" 
                className="border p-1 mr-2 w-1/4" 
              />
              <input 
                type="number" 
                value={newStock} 
                onChange={(e) => setNewStock(e.target.value)} 
                placeholder="Stock" 
                className="border p-1 w-1/4" 
              />
              <button 
                onClick={handleAddTalla} 
                className="bg-blue-500 text-white px-2 py-1 ml-2 rounded"
              >
                Agregar Talla
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
      <td className="border px-4 py-2">
        {selectedProduct === producto._id ? (
          <div>
            {producto.colores.map(color => (
              <div key={color._id} className="flex items-center">
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
                  Eliminar
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
                className="bg-blue-500 text-white px-2 py-1 ml-2 rounded"
              >
                Agregar Color
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
      <td className="border px-4 py-2">
        {selectedProduct === producto._id && (
          <button 
            onClick={() => handleProductUpdate(producto)} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        )}
        <button 
          onClick={() => handleProductDelete(producto._id)} 
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
