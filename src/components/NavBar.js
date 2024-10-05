import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Zapatillas", href: "/zapatillas" },
    { name: "Ropa", href: "/ropa" },
    { name: "Accesorios", href: "/accesorios" },
    { name: "Encargos", href: "/encargos" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-4 bg-white shadow-md">
      <div className="container flex items-center justify-between mx-auto">
        {/* Logo visible en todas las pantallas */}
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={100} height={100} className="" />
        </div>

        {/* Hamburguesa visible solo en mobile */}
        <button
          onClick={toggleMenu}
          className="text-black focus:outline-none md:hidden"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Menú en desktop */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <ul className="flex flex-row space-x-6">
            {navigation.map((menu, index) => (
              <li key={index}>
                <Link
                  href={menu.href}
                  className="px-4 py-2 text-lg font-medium text-black no-underline rounded-md hover:bg-black hover:text-white focus:text-white focus:outline-none"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Menú desplegable en mobile, debajo del logo */}
      {isOpen && (
        <div className="mt-4 md:hidden">
          <ul className="space-y-4">
            {navigation.map((menu, index) => (
              <li key={index}>
                <Link
                  href={menu.href}
                  className="block px-4 py-2 text-lg font-medium text-black no-underline rounded-md hover:bg-black hover:text-white"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
