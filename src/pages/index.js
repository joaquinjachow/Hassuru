import Navbar from "@/components/NavBar";
import React from "react";
import Carousell from "@/components/Carousell";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import Newsletter from "../components/Newsletter";


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
          {/* <Link className="object-cover w-[50%] h-auto" href="/catalogo">
          </Link> */}
            <Image
              src="/images/Encargo.png"
              alt="Encargo"
              width={600}
              height={500}
              className="object-cover w-[49.51%] h-auto"
            />
          {/* <Link className="object-cover w-[50%] h-auto" href="/encargos">
          </Link> */}
        </div>
      </div>
      <div className="mt-2 mb-10">
        <Carousell />
        <Newsletter />
      </div>
    </div>
  );
}
