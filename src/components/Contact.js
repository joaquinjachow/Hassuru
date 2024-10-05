import React from "react";

export default function Contact() {
    const inputStyle = "p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9F1E40]"
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col justify-between p-8 rounded-md shadow-xl bg-gray-50 w-96">
        <h2 className="mb-6 text-2xl font-bold text-center">Encargos</h2>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            className={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            className={inputStyle}
          />
          <textarea
            placeholder="Mensaje"
            className={inputStyle}
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="p-2 text-white transition duration-300 bg-[#9F1E40] rounded-md hover:bg-[#BE1A1D]"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
