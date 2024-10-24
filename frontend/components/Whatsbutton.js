import React from "react";

export default function WhatsButton() {
  const whatsappNumber = "3512591212";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="container mx-auto pt-3">
      <div className="w-full">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 text-center w-full block rounded-lg transition duration-300"
        >
          Contáctanos por WhatsApp
        </a>
      </div>
    </div>
  );
}
