import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    const filePath = path.join(process.cwd(), "suscriptores.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error al leer el archivo:", err);
        return res.status(500).json({ mensaje: "Error al leer el archivo" });
      }
      const suscriptores = JSON.parse(data || "[]");
      if (!suscriptores.includes(email)) {
        suscriptores.push(email);
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
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
