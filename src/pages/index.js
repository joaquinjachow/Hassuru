import Navbar from "@/components/NavBar";
import React from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* Contenedor centrado y con ancho máximo */}
      <div className="container p-4 mx-auto">
        {/* Flex para alinear las imágenes */}
        <div className="flex items-center justify-between gap-x-4">
          {/* Ajuste de las imágenes para que ocupen el ancho completo */}
          <Image
            src="/images/Catalogo.jpg"
            alt="Catalogo"
            width={620}
            height={500}
            className="object-cover w-[50.49%] h-auto"
          />
          <Image
            src="/images/Encargo.png"
            alt="Encargo"
            width={600}
            height={500}
            className="object-cover w-[49.51%] h-auto"
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
