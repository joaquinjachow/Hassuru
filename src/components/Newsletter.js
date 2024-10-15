import React, { useState } from "react";
import WhatsButton from "./Whatsbutton";
import useStore from "@/store/store";

export default function Newsletter() {
  const { handleSubscribe } = useStore();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubscribe(email);
    setEmail("");
  };
  return (
    <div className="container p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center md:space-y-0">
        <div className="w-full md:w-1/2">
          <h1 className="mb-4 text-lg font-bold text-left">
            Suscríbete a nuestra Newsletter
          </h1>
          <form onSubmit={onSubmit} className="flex flex-col md:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              required
              className="w-full p-2 mb-2 border rounded-t-lg md:rounded-l-lg md:rounded-t-none md:mb-0 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white transition duration-300 bg-red-500 rounded-b-lg md:rounded-r-lg md:rounded-b-none hover:bg-red-600"
            >
              Suscribirse
            </button>
          </form>
          {message && <p className="mt-2 text-left text-gray-700">{message}</p>}
        </div>
        <div className="w-full md:w-1/4">
          <WhatsButton />
        </div>
      </div>
    </div>
  );
}
