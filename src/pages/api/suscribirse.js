import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    // Ruta del archivo JSON
    const filePath = path.join(process.cwd(), "suscriptores.json");

    // Leer el archivo existente
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error al leer el archivo:", err); // Agrega este log

        return res.status(500).json({ mensaje: "Error al leer el archivo" });
      }

      const suscriptores = JSON.parse(data || "[]");

      // Verificar si el email ya está suscrito
      if (!suscriptores.includes(email)) {
        suscriptores.push(email);

        // Escribir el nuevo contenido en el archivo
        fs.writeFile(filePath, JSON.stringify(suscriptores), (err) => {
          if (err) {
            return res.status(500).json({ mensaje: "Error al guardar el email" });
          }
          res.status(200).json({ mensaje: "Suscripción exitosa" });
        });
      } else {
        res.status(400).json({ mensaje: "Este email ya está suscrito" });
      }
    });
  } else {
    // Método no permitido
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
