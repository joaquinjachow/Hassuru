import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="p-4 bg-white border-t-2 border-black shadow-md">
      <div className="container flex flex-col items-center justify-between mx-auto space-y-4 md:flex-row md:space-y-0">
        {/* Logo del footer */}
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </div>

        {/* Redes sociales */}
        <div className="flex space-x-6">
          <Link href="https://www.instagram.com" aria-label="Instagram">
            <FaInstagram className="w-6 h-6 text-black hover:text-gray-500" />
          </Link>
          <Link href="https://www.facebook.com" aria-label="Facebook">
            <FaFacebook className="w-6 h-6 text-black hover:text-gray-500" />
          </Link>
          <Link href="https://www.twitter.com" aria-label="Twitter">
            <FaTwitter className="w-6 h-6 text-black hover:text-gray-500" />
          </Link>
        </div>

        {/* Información de contacto */}
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-500">Email: contacto@tuempresa.com</p>
          <p className="text-sm text-gray-500">Tel: +123 456 789</p>
        </div>
      </div>

      {/* Enlaces adicionales */}
      <div className="mt-4 text-center">
        <ul className="flex flex-col items-center space-y-2 md:flex-row md:space-x-6 md:space-y-0">
          <li>
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Términos y Condiciones
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Política de Privacidad
            </Link>
          </li>
          <li>
            <Link href="/returns" className="text-sm text-gray-500 hover:underline">
              Política de Devoluciones
            </Link>
          </li>
        </ul>
      </div>

      {/* Derechos reservados */}
      <div className="mt-4 text-sm text-center text-gray-500">
        &copy; 2024 TuEmpresa. Todos los derechos reservados.
      </div>
    </footer>
  );
}
