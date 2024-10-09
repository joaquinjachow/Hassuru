import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Aquí iría la lógica para enviar el correo al servidor
    const response = await fetch("http://localhost:3000/api/suscribirse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setMessage("¡Gracias por suscribirte!");
      setEmail(""); // Limpiar el campo de entrada
    } else {
      setMessage("Error al suscribirte. Intenta nuevamente.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-sm mt-10 mx-auto">
      <h1 className="text-lg font-bold text-left mb-4">Suscríbete a nuestra Newsletter</h1>
      <form onSubmit={handleSubscribe} className="flex">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo electrónico"
          required
          className="border-none p-2 rounded-l-lg w-full mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
        >
          Suscribirse
        </button>
      </form>
      {message && <p className="mt-2 text-left text-gray-700">{message}</p>}
    </div>
  );
}
