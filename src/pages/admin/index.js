import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"; 

export default function AdminDashboard() {
  useAuth();
  const router = useRouter();
  const [productos, setProductos] = useState([]);
  const [editableProducts, setEditableProducts] = useState([]); // Para manejar los productos editables
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado para edición
  const [isConfirming, setIsConfirming] = useState(false); // Estado para manejar confirmación

  // const [selectedProduct, setSelectedProduct] = useState(null);
  // const [editableProducts, setEditableProducts] = useState(productos);
  // const [productos, setProductos] = useState([]);
  // const [newProduct, setNewProduct] = useState({
  //   nombre: "",
  //   descripcion: "",
  //   precios: { USD: "", AR: "" },
  //   categoria: "",
  //   tallas: new Map(), // Usar Map para las tallas
  //   colores: [{ color: "" }], // Inicializa con un color vacío
  //   image: { url: "" },
  // });
  // const [message, setMessage] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/api/productos", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`, // Incluye el token
      },
    });
    const data = await response.json();
    setProductos(data);
    setEditableProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para manejar la selección de un producto
  const handleProductSelect = (id) => {
    setSelectedProduct(id);
    setIsConfirming(false);
  };

  // Función para manejar los cambios en los campos de productos
  const handleProductChange = (e, index, field) => {
    const updatedProducts = [...editableProducts];
    // Manejar cambios específicos para precios
    if (field.includes('precios')) {
      const [priceType] = field.split('.'); // Obtiene 'precios'
      const priceKey = field.split('.')[1]; // Obtiene 'USD' o 'AR'
      
      // Actualiza el precio correspondiente
      updatedProducts[index][priceType][priceKey] = e.target.value;
    } else {
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: e.target.value
      };
    }
    setEditableProducts(updatedProducts);
  };

  const handleConfirmChanges = async (id) => {
    const updatedProduct = editableProducts.find(producto => producto._id === id);

    const response = await fetch(`http://localhost:5000/api/productos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedProduct),
    });

    if (response.ok) {
      alert("Producto actualizado exitosamente.");
      fetchProducts(); // Recarga los productos
      setIsConfirming(false);
    } else {
      alert("Error al actualizar el producto.");
    }
  };

   // Función para manejar el cierre de sesión
   const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token del localStorage
    router.push("/dashboard"); // Redirige a la página de inicio de sesión
  };


  // const handleAddProduct = async (event) => {
  //   event.preventDefault();
  //   const response = await fetch("http://localhost:5000/api/productos", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${localStorage.getItem("token")}`, // Incluye el token
  //     },
  //     body: JSON.stringify({
  //       ...newProduct,
  //       tallas: Object.fromEntries(newProduct.tallas), // Convierte el Map a un objeto
  //     }),
  //   });

  //   if (response.ok) {
  //     setMessage("Producto agregado exitosamente.");
  //     setNewProduct({
  //       nombre: "",
  //       descripcion: "",
  //       precios: { USD: "", AR: "" },
  //       categoria: "",
  //       tallas: new Map(),
  //       colores: [{ color: "" }],
  //       image: { url: "" },
  //     }); // Resetea el formulario
  //     fetchProducts(); // Actualiza la lista de productos
  //   } else {
  //     const errorData = await response.json();
  //     setMessage(errorData.error);
  //   }
  // };

  // const handleAddTalla = () => {
  //   setNewProduct((prev) => {
  //     const newTallas = new Map(prev.tallas);
  //     newTallas.set("", 0); // Agrega una nueva talla con stock inicial 0
  //     return { ...prev, tallas: newTallas };
  //   });
  // };

  // const handleTallaChange = (key, value) => {
  //   setNewProduct((prev) => {
  //     const newTallas = new Map(prev.tallas);
  //     if (value === "") {
  //       newTallas.delete(key); // Elimina la talla si está vacía
  //     } else {
  //       newTallas.set(value, newTallas.get(key) || 0); // Establece el valor si existe o lo inicializa
  //       newTallas.delete(key); // Elimina el valor antiguo
  //     }
  //     return { ...prev, tallas: newTallas };
  //   });
  // };

  // const handleColorChange = (index, value) => {
  //   setNewProduct((prev) => {
  //     const newColores = [...prev.colores];
  //     newColores[index].color = value;
  //     return { ...prev, colores: newColores };
  //   });
  // };

  // const handleAddColor = () => {
  //   setNewProduct((prev) => ({
  //     ...prev,
  //     colores: [...prev.colores, { color: "" }],
  //   }));
  // };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* <!-- Side Panel --> */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col justify-between">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard Panel</h1>
          <ul>
            <li className="mb-4">
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-300">Agregar Producto</a>
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
      </aside>

      {/* <!-- Main Content --> */}
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-semibold mb-6 text-black">Bienvenido al Dashboard</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6 text-black">Lista de Productos</h2>

          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-2 py-2">Seleccionar</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Descripción</th>
                <th className="px-4 py-2">Categoría</th>
                <th className="px-4 py-2">Precios (USD/AR)</th>
                <th className="px-4 py-2">Tallas</th>
                <th className="px-4 py-2">Colores</th>
                <th className="px-4 py-2">Imagen</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {editableProducts.map((producto, index) => (
                <tr key={producto._id} className="text-gray-600">
                  {/* Agregamos el radio button para seleccionar */}
                  <td className="border px-4 py-2">
                    <input
                      type="radio"
                      name="selectedProduct"
                      onChange={() => handleProductSelect(producto._id)}
                      checked={selectedProduct === producto._id}
                    />
                  </td>
                  {/* Si el producto está seleccionado, los campos son editables */}
                  <td className="border px-4 py-2">
                    {selectedProduct === producto._id ? (
                      <input
                        type="text"
                        value={producto.nombre}
                        onChange={(e) => handleProductChange(e, index, "nombre")}
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
                        onChange={(e) => handleProductChange(e, index, "descripcion")}
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
                        onChange={(e) => handleProductChange(e, index, "categoria")}
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
                          onChange={(e) => handleProductChange(e, index, "precios.USD")}
                          className="border p-1 mb-1" // Agregamos un margen inferior para separar los inputs
                        />
                        <input
                          type="text"
                          value={producto.precios.AR}
                          onChange={(e) => handleProductChange(e, index, "precios.AR")}
                          className="border p-1"
                        />
                      </div>
                    ) : (
                      <div>
                        {producto.precios.USD} USD<br />
                        {producto.precios.AR} AR
                      </div>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {Object.entries(producto.tallas).map(([talla, stock]) => (
                      <div key={talla}>
                        {talla}: {stock > 0 ? stock : "Sin stock"}
                      </div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    {producto.colores.map((color, index) => (
                      <span key={index} className="mr-2">{color.color ? color.color : 'Sin color'}</span>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    <img
                      src={producto.image.url}
                      alt={producto.nombre}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  {/* Botón de confirmación cuando el producto está seleccionado */}
                  <td className="border px-4 py-2">
                  {selectedProduct === producto._id && (
                    <div className="flex flex-col space-y-2">
                      <button
                        className="bg-green-700 text-white py-2 px-2 rounded hover:bg-green-800 transition"
                        onClick={() => handleConfirmChanges(producto._id)}
                      >
                        Guardar
                      </button>
                      <button
                        className="bg-red-600 text-white py-2 px-2 rounded hover:bg-red-700 transition"
                        onClick={() => setSelectedProduct(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}




// <div classNameName="p-6">
    //   <h1 classNameName="text-3xl font-bold mb-4">Dashboard</h1>
    //   {message && <p classNameName="text-red-500 mb-4">{message}</p>}
      
    //   {/* Formulario para agregar un nuevo producto */}
    //   <form onSubmit={handleAddProduct} classNameName="mb-6">
    //     <h2 classNameName="text-2xl font-bold mb-2">Agregar Producto</h2>
    //     <input
    //       type="text"
    //       placeholder="Nombre del producto"
    //       value={newProduct.nombre}
    //       onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
    //       required
    //       classNameName="border p-2 mb-2 w-full"
    //     />
    //     <textarea
    //       placeholder="Descripción del producto"
    //       value={newProduct.descripcion}
    //       onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
    //       required
    //       classNameName="border p-2 mb-2 w-full"
    //     />
    //     <input
    //       type="text"
    //       placeholder="Categoría"
    //       value={newProduct.categoria}
    //       onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
    //       required
    //       classNameName="border p-2 mb-2 w-full"
    //     />
    //     <input
    //       type="number"
    //       placeholder="Precio en USD"
    //       value={newProduct.precios.USD}
    //       onChange={(e) => setNewProduct({ ...newProduct, precios: { ...newProduct.precios, USD: Number(e.target.value) } })}
    //       required
    //       classNameName="border p-2 mb-2 w-full"
    //     />
    //     <input
    //       type="number"
    //       placeholder="Precio en AR"
    //       value={newProduct.precios.AR}
    //       onChange={(e) => setNewProduct({ ...newProduct, precios: { ...newProduct.precios, AR: Number(e.target.value) } })}
    //       required
    //       classNameName="border p-2 mb-2 w-full"
    //     />
    //     <input
    //       type="text"
    //       placeholder="URL de la imagen"
    //       value={newProduct.image.url}
    //       onChange={(e) => setNewProduct({ ...newProduct, image: { url: e.target.value } })}
    //       required
    //       classNameName="border p-2 mb-2 w-full"
    //     />
        
    //     {/* Campo para agregar tallas */}
    //     <h3 classNameName="text-lg font-semibold mb-2">Tallas</h3>
    //     {[...newProduct.tallas.keys()].map((talla, index) => (
    //       <div key={index} classNameName="mb-2">
    //         <input
    //           type="text"
    //           placeholder="Talla"
    //           value={talla}
    //           onChange={(e) => handleTallaChange(talla, e.target.value)}
    //           classNameName="border p-2 mr-2"
    //         />
    //         <input
    //           type="number"
    //           placeholder="Stock"
    //           value={newProduct.tallas.get(talla) || ""}
    //           onChange={(e) => setNewProduct((prev) => {
    //             const newTallas = new Map(prev.tallas);
    //             newTallas.set(talla, Number(e.target.value));
    //             return { ...prev, tallas: newTallas };
    //           })}
    //           classNameName="border p-2"
    //         />
    //       </div>
    //     ))}
    //     <button type="button" onClick={handleAddTalla} classNameName="bg-green-500 text-white p-2 mb-2">Agregar Talla</button>

    //     {/* Campo para agregar colores */}
    //     <h3 classNameName="text-lg font-semibold mb-2">Colores</h3>
    //     {newProduct.colores.map((color, index) => (
    //       <div key={index} classNameName="mb-2">
    //         <input
    //           type="text"
    //           placeholder="Color"
    //           value={color.color}
    //           onChange={(e) => handleColorChange(index, e.target.value)}
    //           classNameName="border p-2 mr-2"
    //           required
    //         />
    //       </div>
    //     ))}
    //     <button type="button" onClick={handleAddColor} classNameName="bg-green-500 text-white p-2 mb-2">Agregar Color</button>

    //     <button type="submit" classNameName="bg-blue-500 text-white p-2">Agregar Producto</button>
    //   </form>

    //   {/* Listar productos */}
    //   <h2 classNameName="text-2xl font-bold mb-2">Lista de Productos</h2>
    //   <ul classNameName="space-y-4">
    //     {productos.map((producto) => (
    //       <li key={producto._id} classNameName="border p-4">
    //         <h3 classNameName="text-xl">{producto.nombre}</h3>
    //         <div>
    //           <h4 classNameName="font-semibold">Descripción: {producto.descripcion}</h4>
    //           <h4 classNameName="font-semibold">Categoría: {producto.categoria}</h4>
    //           <h4 classNameName="font-semibold">Precio en USD: {producto.precios.USD}</h4>
    //           <h4 classNameName="font-semibold">Precio en AR: {producto.precios.AR}</h4>
    //           <h4 classNameName="font-semibold">Tallas:</h4>
    //           {Object.entries(producto.tallas).map(([talla, stock]) => (
    //             <div key={talla}>
    //               <span>{talla}: {stock}</span>
    //             </div>
    //           ))}
    //           <h4 classNameName="font-semibold">Colores:</h4>
    //           {producto.colores.map((color, index) => (
    //             <span key={index} classNameName="mr-2">{color.color}</span>
    //           ))}
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>