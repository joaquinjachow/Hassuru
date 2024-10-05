import Navbar from "@/components/NavBar";
import React from "react";
import Carousell from "@/components/Carousell";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <div className="container p-4 mx-auto">
        <div className="flex items-center justify-between gap-x-4">
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
      <div className="mt-2 mb-10">
        <Carousell />
      </div>
    </div>
  );
}
