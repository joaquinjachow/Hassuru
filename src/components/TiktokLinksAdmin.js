import React, { useEffect, useState } from 'react';

const TiktokLinksAdmin = () => {
  const [tiktoks, setTiktoks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [newLink, setNewLink] = useState('');

  // Fetch inicial para obtener los enlaces de TikTok
  const fetchTiktokLinks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/tiktoks");
      if (!response.ok) {
        throw new Error("Error al obtener los enlaces de TikTok");
      }
      const data = await response.json();
      setTiktoks(data); // Asume que `data` es un array de objetos TikTok
    } catch (error) {
      console.error("Error al cargar los enlaces de TikTok", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiktokLinks();
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewLink(tiktoks[index].link); // Cargar el enlace actual en el campo de texto
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/tiktoks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ link: newLink }), 
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar el enlace de TikTok");
      }
  
      // Actualizar la lista local de tiktoks
      const updatedTiktok = await response.json();
      const updatedTiktoks = tiktoks.map((tiktok) =>
        tiktok._id === id ? updatedTiktok : tiktok
      );
      setTiktoks(updatedTiktoks);
      setEditIndex(null); 
      setNewLink('');
    } catch (error) {
      console.error("Error al actualizar el enlace", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-xl font-semibold text-black">Enlaces de TikTok</h2>
      {loading ? (
        <p>Cargando enlaces...</p>
      ) : (
        <ul className="space-y-4">
          {tiktoks.map((tiktok, index) => (
            <li key={tiktok._id} className="flex flex-col sm:flex-row items-center justify-between">
              <span className="w-full sm:w-auto max-w-xs sm:max-w-none overflow-hidden whitespace-nowrap overflow-ellipsis" title={tiktok.link}>
                {tiktok.link}
              </span>
              <div className="flex items-center mt-2 sm:mt-0">
                <button
                  onClick={() => handleEdit(index)}
                  className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                {editIndex === index && (
                  <>
                    <input
                      type="url"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      className="border p-1 rounded ml-2 w-full sm:w-60"
                      placeholder="Nuevo enlace"
                    />
                    <button
                      onClick={() => handleUpdate(tiktok._id)}
                      className="ml-2 px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                    >
                      Guardar
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TiktokLinksAdmin;
