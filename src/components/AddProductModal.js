import React, { useState, useEffect } from 'react';
import useFetchDolar from '../hooks/useFetchDolar';

const AddProductModal = ({ isOpen, onClose, fetchProducts }) => {
  const [product, setProduct] = useState({
    nombre: '',
    descripcion: '',
    marca: '',
    categoria: '',
    precio: '',
    tallas: {},
    colores: [],
    image: { base64: '' },
    destacado: false,
  });

  const [tallaInput, setTallaInput] = useState('');
  const [cantidadTalla, setCantidadTalla] = useState('');
  const [colorInput, setColorInput] = useState('');

  const [dolarBlue, setDolarBlue] = useState(null); // Estado para el precio del dólar blue

  const categoriasDisponibles = [
    'ropa',
    'zapatillas',
    'accesorios',
  ];

  // Obtener el precio del dólar blue al cargar el componente
  useEffect(() => {
    const fetchDolarBlue = async () => {
      try {
        const response = await fetch("https://dolarapi.com/v1/dolares/blue");
        const data = await response.json();
        console.log(data);
        console.log("Datos del Dólar Blue:", data?.venta);
        setDolarBlue(data?.venta);
      } catch (error) {
        console.error("Error al obtener el precio del dólar blue:", error);
      }
    };

    fetchDolarBlue();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Si el campo es parte de los precios, conviértelo en número
    if (name === 'precio') {
      const price = value ? parseFloat(value) : ''; // Solo convertir si el valor no está vacío
      setProduct((prev) => ({
        ...prev,
        precio: price,
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({
          ...prev,
          image: { base64: reader.result },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTalla = () => {
    if (tallaInput && cantidadTalla) {
      setProduct((prev) => ({
        ...prev,
        tallas: {
          ...prev.tallas,
          [tallaInput]: parseInt(cantidadTalla, 10),
        },
      }));
      setTallaInput('');
      setCantidadTalla('');
    }
  };

  const handleRemoveTalla = (tallaToRemove) => {
    const updatedTallas = { ...product.tallas };
    delete updatedTallas[tallaToRemove];
    setProduct((prevProduct) => ({
      ...prevProduct,
      tallas: updatedTallas,
    }));
  };

  const handleAddColor = () => {
    if (colorInput) {
      setProduct((prev) => ({
        ...prev,
        colores: [...prev.colores, { color: colorInput }],
      }));
      setColorInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!product.image.url) {
    //   alert('Por favor, agrega una URL de imagen válida.');
    //   return;
    // }

    const productoAEnviar = {
      nombre: product.nombre,
      descripcion: product.descripcion,
      marca: product.marca,
      categoria: product.categoria,
      precio: parseFloat(product.precio),
      tallas: product.tallas,
      colores: product.colores,
      image: { base64: product.image.base64 },
      destacado: false,
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
      onClose();
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      alert('Error al agregar el producto');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 text-black">
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
            name="precio"
            placeholder="Precio en USD"
            value={product.precio}
            onChange={handleInputChange}
            required
            className="border p-2 mb-4 w-full"
          />

          {/* Input de archivo para la imagen */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 mb-4 w-full"
          />
          
          <div className="mb-4 flex flex-col sm:flex-row sm:space-x-2">
            <input
              type="text"
              value={tallaInput}
              onChange={(e) => setTallaInput(e.target.value)}
              placeholder="Agregar Talla"
              className="border p-2 mb-2 sm:mb-0 w-full sm:w-1/4"
            />
            <input
              type="number"
              value={cantidadTalla}
              onChange={(e) => setCantidadTalla(e.target.value)}
              placeholder="Cantidad"
              className="border p-2 mb-2 sm:mb-0 w-full sm:w-1/4"
            />
            <button type="button" onClick={handleAddTalla} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 sm:mt-0">Agregar Talla</button>
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
          <div className="mb-4 flex flex-col sm:flex-row sm:space-x-2">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="Agregar Color"
              className="border p-2 mb-2 sm:mb-0 w-full sm:w-1/4"
            />
            <button type="button" onClick={handleAddColor} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 sm:mt-0">Agregar Color</button>
          </div>
          <div className="mb-4">
            <h3>Colores:</h3>
            {product.colores.map((color, index) => (
              <div key={index} className="flex justify-between items-center">
                {color.color}
                <button 
                  type="button" 
                  onClick={() => setProduct((prev) => ({
                    ...prev,
                    colores: prev.colores.filter((_, i) => i !== index)
                  }))} 
                  className="bg-red-500 text-white px-4 py-2 rounded">
                    Eliminar
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Cancelar</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Agregar Producto</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
