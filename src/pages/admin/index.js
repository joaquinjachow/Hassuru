// pages/admin/index.js
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"; 
import ProductList from "../../components/ProductList"; 
import Sidebar from "../../components/Sidebar";

export default function AdminDashboard() {
  useAuth();
  const router = useRouter();
  const [productos, setProductos] = useState([]);
  const [editableProducts, setEditableProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true); // Inicia la carga
    try {
      const response = await fetch("http://localhost:5000/api/productos", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      const data = await response.json();
      console.log(data); 
      setProductos(data);
      setEditableProducts(data);
    } catch (error) {
      console.error(error);
      // Mostrar un mensaje de error al usuario si es necesario
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProductsFiltered = async (categoria) => {
    setLoading(true); // Comienza la carga
    try {
      const response = await fetch(`http://localhost:5000/api/productos/categoria/${categoria}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al cargar los productos filtrados por categoría");
      }
      const data = await response.json();
      setEditableProducts(data);
    } catch (error) {
      console.error(error);
      // Manejo de errores (opcional)
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 w-full">
      <Sidebar
        handleLogout={handleLogout}
        fetchProducts={fetchProducts}
        
      />
      <div className="w-full flex-1 p-4 md:p-10">
        <h2 className="text-2xl font-semibold mb-6 text-black">Bienvenido al Dashboard</h2>
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <ProductList 
            editableProducts={editableProducts}
            setEditableProducts={setEditableProducts}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            fetchProducts={fetchProducts}
            fetchProductsFiltered={fetchProductsFiltered}
          />
        )}
      </div>
    </div>
  );
}
