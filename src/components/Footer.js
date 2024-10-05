import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="p-4 text-black bg-white border-t-2 border-black shadow-md">
      <div className="container flex flex-col items-center justify-between mx-auto space-y-4 md:flex-row md:space-y-0">
        {/* Logo del footer */}
        {/* <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </div> */}

        {/* Redes sociales */}
        <div className="flex space-x-6">
          <Link href="https://www.instagram.com/hassuru" aria-label="Instagram">
            <FaInstagram className="w-6 h-6 hover:text-gray-500" />
          </Link>
          <Link href="https://www.tiktok.com/@hassuru.ar" aria-label="Tiktok">
            <FaTiktok className="w-6 h-6 hover:text-gray-500" />
          </Link>
        </div>

        {/* Información de contacto */}
        <div className="text-sm text-center md:text-right">
          <p>Email: hassuru.ar@gmail.com</p>
          <p>Tel: 351 259 1212</p>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="mt-4 text-sm text-center">
        &copy; 2024 TuEmpresa. Todos los derechos reservados.
      </div>
    </footer>
  );
}
