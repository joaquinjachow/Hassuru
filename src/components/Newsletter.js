import React, { useState } from "react";
import WhatsButton from "./Whatsbutton";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/suscribirse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setMessage("¡Gracias por suscribirte!");
      setEmail("");
    } else {
      setMessage("Error al suscribirte. Intenta nuevamente.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md container mt-10 mx-auto">
      {/* Contenedor ajustado para dispositivos móviles */}
      <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
        {/* Formulario de Newsletter */}
        <div className="w-full md:w-1/2">
          <h1 className="text-lg font-bold text-left mb-4">
            Suscríbete a nuestra Newsletter
          </h1>
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              required
              className="border p-2 rounded-t-lg md:rounded-l-lg md:rounded-t-none w-full mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="bg-red-500 text-white font-semibold px-4 py-2 rounded-b-lg md:rounded-r-lg md:rounded-b-none hover:bg-red-600 transition duration-300"
            >
              Suscribirse
            </button>
          </form>
          {message && <p className="mt-2 text-left text-gray-700">{message}</p>}
        </div>

        {/* Botón de WhatsApp ajustado para móviles */}
        <div className="w-full md:w-1/4">
          <WhatsButton />
        </div>
      </div>
    </div>
  );
}
