import { create } from 'zustand';

const useStore = create((set) => ({
  products: [],
  product: null,
  dolarBlue: null,
  loading: false,
  error: null,
  productAdded: false,
  filteredProducts: [],
  message: "",
  email: "",

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await fetch('http://localhost:5000/api/productos', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      const data = await response.json();
      set({ products: data });
    } catch (error) {
      set({ error: error.message });
      console.error('Error al cargar los productos:', error);
    } finally {
      set({ loading: false });
    }
  },

  addProduct: async (productoAEnviar) => {
    set({ loading: true });
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
      set({ productAdded: true });
      await useStore.getState().fetchProducts();
    } catch (error) {
      set({ error: error.message });
      console.error('Error al agregar el producto:', error);
      alert('Error al agregar el producto');
    } finally {
      set({ loading: false });
    }
  },

  fetchProductsByCategory: async (categoria) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`http://localhost:5000/api/productos/categoria/${categoria}`);
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      const data = await response.json();
      set({ products: data, filteredProducts: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      const response = await fetch(`http://localhost:5000/api/productos/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener el producto');
      }
      const data = await response.json();
      set({ product: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchDolarBlue: async () => {
    set({ loading: true });
    try {
      const response = await fetch('https://dolarapi.com/v1/dolares/blue');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      set({ dolarBlue: data.venta });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
  setFilteredProducts: (filtered) => set({ filteredProducts: filtered }),

  handleSubscribe: async (email) => {
    set({ loading: true, message: "" });
    try {
      const response = await fetch("http://localhost:3000/api/suscribirse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        set({ message: "¡Gracias por suscribirte!" });
      } else {
        set({ message: "Error al suscribirte. Intenta nuevamente." });
      }
    } catch (error) {
      set({ message: "Error al suscribirte. Intenta nuevamente." });
      console.error("Error al suscribirte:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useStore;
