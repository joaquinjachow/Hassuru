import React, { useState, useEffect } from "react";
import Carousell from "@/components/Carousell";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "../components/Newsletter";
import useStore from "@/store/store";
import { BounceLoader } from 'react-spinners';

export default function Home() {
const { loading, error, products, fetchProducts, dolarBlue, fetchDolarBlue } = useStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchDolarBlue();
  }, []);

  if (loading) return <div className="flex items-center justify-center mt-[15%]"><BounceLoader color="#BE1A1D"/></div>;
  if (error) return <div>Error: {error}</div>;

  const destacados = products.filter((product) => product.destacado === true);
  const zapatillas = products.filter((product) => product.destacado_zapatillas === true);

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
        <Carousell dolarBlue={dolarBlue} products={destacados} title={"Destacados"} />
      </div>
      <div className="mt-8 mb-10">
        <Carousell dolarBlue={dolarBlue} products={zapatillas} title={"Zapatillas"} />
      </div>
      <div className="container grid grid-cols-1 gap-4 px-2 mx-auto mt-8 lg:px-24 md:grid-cols-3">
        <iframe
          src="https://www.tiktok.com/embed/7420249638982274310"
          width="100%"
          height="750"
          allow="encrypted-media"
        ></iframe>
        <iframe
          src="https://www.tiktok.com/embed/7368541174270840069"
          width="100%"
          height="750"
          allow="encrypted-media"
        ></iframe>
        <iframe
          src="https://www.tiktok.com/embed/7370028703503387909"
          width="100%"
          height="750"
          allow="encrypted-media"
        ></iframe>
      </div>
      <div className="mb-4">
        <Newsletter />
      </div>
    </main>
  );
}
