import React, { useState, useEffect } from "react";
import Carousell from "@/components/Carousell";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "../components/Newsletter";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/productos");
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const destacados = allProducts.filter((product) => product.destacado === true);
  const zapatillas = allProducts.filter((product) => product.destacado_zapatillas === true);

  return (
    <main>
      <div className="container p-4 mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link className="w-full md:w-[50.49%] h-auto block" href="/catalogo">
            <Image
              src="/images/Catalogo.jpg"
              alt="Catalogo"
              width={620}
              height={500}
              className="object-cover w-full h-full"
            />
          </Link>
          <Link className="w-full md:w-[49.51%] h-auto block" href="/encargos">
            <Image
              src="/images/Encargo.png"
              alt="Encargo"
              width={600}
              height={500}
              className="object-cover w-full h-full"
            />
          </Link>
        </div>
      </div>
      <div className="mt-2">
        <Carousell products={destacados} title={"Destacados"} />
      </div>
      <div className="mt-8 mb-10">
        <Carousell products={zapatillas} title={"Zapatillas"} />
      </div>
      <div className="container grid grid-cols-1 gap-4 px-24 mx-auto mt-8 md:grid-cols-3">
        <iframe
          src="https://www.tiktok.com/embed/7420249638982274310"
          width="100%"
          height="750"
          allow="autoplay; encrypted-media"
        ></iframe>
        <iframe
          src="https://www.tiktok.com/embed/7368541174270840069"
          width="100%"
          height="750"
          allow="autoplay; encrypted-media"
        ></iframe>
        <iframe
          src="https://www.tiktok.com/embed/7370028703503387909"
          width="100%"
          height="750"
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>
      <div className="mb-4">
        <Newsletter />
      </div>
    </main>
  );
}
