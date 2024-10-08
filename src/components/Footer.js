import React from "react";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = 'https://api.whatsapp.com/send?phone=3512591212&text=';
    window.open(url, "_blank");
};
  return (
    <footer className="=p-4 text-black bg-white shadow-md">
      <div className="container flex flex-col items-center justify-between mx-auto space-y-4 border-t-2 border-black rounded-sm md:flex-row md:space-y-0">
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
          <p className='mt-4'>Email: hassuru.ar@gmail.com</p>
          <button className='text-green-700' onClick={handleSubmit}>Tel: 351 259 1212</button>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="mt-4 text-sm text-center">
        &copy; 2024 @Hassuru. Todos los derechos reservados.
      </div>
    </footer>
  );
}
