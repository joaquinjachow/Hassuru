import { useState, useEffect } from 'react';

const useFetchDolar = () => {
  const [dolarBlue, setDolarBlue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDolarBlue = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares/blue');
        const data = await response.json();
        setDolarBlue(data?.venta); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDolarBlue();
  }, []);

  return { dolarBlue, loading, error };
};

export default useFetchDolar;
