import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const navigation = [
        { name: "Zapatillas", href: "/zapatillas" },
        { name: "Ropa", href: "/ropa" },
        { name: "Accesorios", href: "/accesorios" },
        { name: "Encargos", href: "/encargos" }
      ];
      
  return (
    <nav className="p-10">
      <div className="container flex items-center justify-between mx-auto">
        <ul className="flex space-x-6">
            {navigation.map((menu, index) => (
              <li key={index}>
                <Link href={menu.href} className="px-4 py-2 text-lg font-medium text-black no-underline rounded-md hover:bg-gray-500 hover:text-red-500 focus:text-white focus:outline-none">
                  {menu.name}
                </Link>
              </li>
            ))}
        </ul>
        <div className="absolute transform -translate-x-1/2 left-1/2">
          <Image src="/logo.png" alt="Logo" width={130} height={130} className="" />
        </div>
      </div>
    </nav>
  );
}