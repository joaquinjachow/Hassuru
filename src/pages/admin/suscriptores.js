import fs from "fs";
import path from "path";
import { useState } from "react";

export default function Suscriptores({ emails }) {
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 39;
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);
  const totalPages = Math.ceil(emails.length / emailsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Lista de Suscriptores</h1>
      <div className="p-4 bg-white rounded-lg shadow-md">
        {emails.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {currentEmails.map((email, index) => (
              <div
                key={index}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg shadow-sm"
              >
                {email}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay suscriptores.</p>
        )}
      </div>
      {emails.length > emailsPerPage && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "suscriptores.json");
  let emails = [];
  try {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    emails = JSON.parse(jsonData || "[]");
  } catch (error) {
    console.error("Error al leer el archivo:", error);
  }
  return {
    props: {
      emails,
    },
  };
}
