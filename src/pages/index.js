import React from "react";
import Carousell from "@/components/Carousell";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "../components/Newsletter";
import { useState, useEffect } from "react";


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

  const destacados = allProducts.filter(product => product.destacado === true);
  const zapatillas = allProducts.filter(product => product.categoria === "zapatillas");

  return (
    <div>
      <div className="container p-4 mx-auto">
        <div className="flex items-center justify-between gap-x-4">
        <Link className="w-[50.49%] h-auto block" href="/catalogo">
            <Image
              src="/images/Catalogo.jpg"
              alt="Catalogo"
              width={620}
              height={500}
              className="object-cover w-full h-full"
            />
          </Link>
          <Link className="w-[49.51%] h-auto block" href="/encargos">
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
        <Newsletter />
      </div>
    </div>
  );
}
