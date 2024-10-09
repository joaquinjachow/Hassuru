import fs from "fs";
import path from "path";

export default function Suscriptores({ emails }) {
  return (
    <div>
      <h1>Lista de Suscriptores</h1>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "suscriptores.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const emails = JSON.parse(jsonData || "[]");

  return {
    props: {
      emails,
    },
  };
}
