import { useState, useEffect } from 'react';

const useFetchDolar = () => {
  const [dolarBlue, setDolarBlue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag para evitar actualizaciones de estado si el componente se desmonta.

    const fetchDolarBlue = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares/blue');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (isMounted) {
          setDolarBlue(data?.venta); 
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDolarBlue();

    return () => {
      isMounted = false;
    };
  }, []);

  return { dolarBlue, loading, error };
};

export default useFetchDolar;
