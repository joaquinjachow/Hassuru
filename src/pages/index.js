import React, { useState, useEffect } from "react";
import Carousell from "@/components/Carousell";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "../components/Newsletter";
import useStore from "@/store/store";
import { BounceLoader } from 'react-spinners';

export default function Home() {
const { loading, error, products, fetchProducts, dolarBlue, fetchDolarBlue, fetchTikTokLinks, tiktokLinks } = useStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchDolarBlue();
  }, []);

  useEffect(() => {
    fetchTikTokLinks();
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
      {tiktokLinks[0]?.link && (
          <iframe
            src={tiktokLinks[0].link}
            width="100%"
            height="750"
            style={{ border: "none" }}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; accelerometer; gyroscope;"
            allowFullScreen
          ></iframe>
        )}
        {tiktokLinks[1]?.link && (
          <iframe
            src={tiktokLinks[1].link}
            width="100%"
            height="750"
            style={{ border: "none" }}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; accelerometer; gyroscope;"
            allowFullScreen
          ></iframe>
        )}
        {tiktokLinks[2]?.link && (
          <iframe
            src={tiktokLinks[2].link}
            width="100%"
            height="750"
            style={{ border: "none" }}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; accelerometer; gyroscope;"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="mb-4">
        <Newsletter />
      </div>
    </main>
  );
}
