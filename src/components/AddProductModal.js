import React, { useState } from 'react';

const AddProductModal = ({ isOpen, onClose, fetchProducts}) => {
  const [product, setProduct] = useState({
    nombre: '',
    descripcion: '',
    marca: '',
    categoria: '',
    precios: { USD: '', AR: '' },
    tallas: {}, // Ahora es un objeto
    colores: [], // Array de objetos { color: '' }
    image: { url: '' },
    destacado: false, // Se agrega campo destacado
  });

  const [tallaInput, setTallaInput] = useState('');
  const [cantidadTalla, setCantidadTalla] = useState('');
  const [colorInput, setColorInput] = useState('');

  // Lista de categorías disponibles
  const categoriasDisponibles = [
    'ropa',
    'zapatillas',
    'accesorios',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Verifica si el campo es para la URL de la imagen
    if (name === 'image.url') {
      setProduct((prev) => ({
        ...prev,
        image: { url: value }, // Actualiza solo la URL de la imagen
      }));
      return;
    }
  
    // Si el campo es parte de los precios, conviértelo en número
    if (name === 'precios.USD' || name === 'precios.AR') {
      const [key, subkey] = name.split('.');
      setProduct((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [subkey]: parseFloat(value), // Convertir el precio a número
        },
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  const handleAddTalla = () => {
    if (tallaInput && cantidadTalla) {
      setProduct((prev) => ({
        ...prev,
        tallas: {
          ...prev.tallas,
          [tallaInput]: parseInt(cantidadTalla, 10), // Agrega la talla y la cantidad
        },
      }));
      setTallaInput(''); // Limpiar el input de la talla
      setCantidadTalla(''); // Limpiar el input de la cantidad
    }
  };

  const handleRemoveTalla = (tallaToRemove) => {
    const updatedTallas = { ...product.tallas }; // Copia las tallas actuales
    delete updatedTallas[tallaToRemove]; // Elimina la talla seleccionada
    setProduct((prevProduct) => ({
      ...prevProduct,
      tallas: updatedTallas,
    }));
  };
  

  const handleAddColor = () => {
    if (colorInput) {
      setProduct((prev) => ({
        ...prev,
        colores: [...prev.colores, { color: colorInput }], // Agrega un objeto con el color
      }));
      setColorInput(''); // Limpiar el input de color
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.image.url) {
      alert('Por favor, agrega una URL de imagen válida.');
      return;
    }

    // Verifica los datos antes de enviarlos
    const productoAEnviar = {
      nombre: product.nombre,
      descripcion: product.descripcion,
      marca: product.marca,
      categoria: product.categoria,
      precios: {
        USD: parseFloat(product.precios.USD),
        AR: parseFloat(product.precios.AR),
      },
      tallas: product.tallas, // Ya es un objeto con las tallas y cantidades
      colores: product.colores, // Array de objetos con { color: 'color' }
      image: {
        url: product.image.url,
      },
      destacado: false, // Campo destacado
    };
    console.log("Producto a enviar:", productoAEnviar);

    try {
      const response = await fetch('http://localhost:5000/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(productoAEnviar),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta del servidor:', errorData);
        alert(`Error al agregar el producto: ${errorData.message || 'Error desconocido'}`);
        return;
      }
      

      alert('Producto agregado con éxito');
      fetchProducts();
      onClose(); // Cierra el modal
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      alert('Error al agregar el producto');
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-black">
        <h2 className="text-xl mb-4">Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={product.nombre}
            onChange={handleInputChange}
            required
            className="border p-2 mb-4 w-full"
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={product.descripcion}
            onChange={handleInputChange}
            className="border p-2 mb-4 w-full"
          />
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            value={product.marca}
            onChange={handleInputChange}
            required
            className="border p-2 mb-4 w-full"
          />
          {/* Campo para seleccionar la categoría */}
          <select
            name="categoria"
            value={product.categoria}
            onChange={handleInputChange}
            required
            className="border p-2 mb-4 w-full"
          >
            <option value="">Seleccione una categoría</option>
            {categoriasDisponibles.map((categoria, index) => (
              <option key={index} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="precios.USD"
            placeholder="Precio en USD"
            value={product.precios.USD}
            onChange={handleInputChange}
            required
            className="border p-2 mb-4 w-full"
          />
          <input
            type="text"
            name="precios.AR"
            placeholder="Precio en ARS"
            value={product.precios.AR}
            onChange={handleInputChange}
            required
            className="border p-2 mb-4 w-full"
          />
          <input
            type="text"
            name="image.url"
            placeholder="URL de imagen"
            value={product.image.url}
            onChange={handleInputChange}
            className="border p-2 mb-4 w-full"
          />
          
          {/* Campo para agregar tallas */}
          <div className="mb-4">
            <input
              type="text"
              value={tallaInput}
              onChange={(e) => setTallaInput(e.target.value)}
              placeholder="Agregar Talla"
              className="border p-2 mr-2 w-1/4"
            />
            <input
              type="number"
              value={cantidadTalla}
              onChange={(e) => setCantidadTalla(e.target.value)}
              placeholder="Cantidad"
              className="border p-2 mr-2 w-1/4"
            />
            <button type="button" onClick={handleAddTalla} className="bg-blue-500 text-white px-4 py-2 rounded">Agregar Talla</button>
          </div>
          <ul className="mb-4">
            {Object.entries(product.tallas).map(([talla, cantidad], index) => (
              <li key={index} className="flex justify-between items-center">
                Talla {talla}: {cantidad} unidades
                <button 
                  type="button" 
                  onClick={() => handleRemoveTalla(talla)} 
                  className="bg-red-500 text-white px-4 py-2 rounded">
                    Eliminar
                </button>
              </li>
            ))}
          </ul>
          
          {/* Campo para agregar colores */}
          <div className="mb-4">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="Agregar Color"
              className="border p-2 mr-2 w-2/3"
            />
            <button type="button" onClick={handleAddColor} className="bg-blue-500 text-white px-4 py-2 rounded">Agregar Color</button>
          </div>
          <ul className="mb-4">
            {product.colores.map((color, index) => (
              <li key={index}>{color.color}</li>
            ))}
          </ul>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Agregar Producto</button>
          <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
