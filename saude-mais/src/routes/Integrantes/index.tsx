import { useEffect } from "react";
import ryan from "../../img/ryan.svg";
import raul from "../../img/raul.svg";
import pietro from "../../img/pietro.svg";

export default function Integrantes() {
  useEffect(() => {
    document.title = "Integrantes";
  }, []);

  const integrantes = [
    {
      nome: "Pietro Donella",
      rm: "561722",
      turma: "1TDSPF",
      github: "PietroDonella",
      linkedin: "Pietro Donella Salomão",
      img: pietro,
    },
    {
      nome: "Raul Rezende",
      rm: "564002",
      turma: "1TDSPF",
      github: "Raul-Rezende",
      linkedin: "Raul Rezende Lemini Agular",
      img: raul,
    },
    {
      nome: "Ryan Vetoriano",
      rm: "565667",
      turma: "1TDSPF",
      github: "ryanvetoriano",
      linkedin: "Ryan Vetoriano",
      img: ryan,
    },
  ];

  return (
    <main className="bg-blue-200 h-[80vh] w-[100vw] flex justify-center py-10 px-4">
      <section className="bg-gray-50 p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-blue-300 mb-6">Integrantes</h2>
        <div className="flex flex-col gap-6">
          {integrantes.map((i, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center bg-blue-100 p-4 rounded shadow hover:shadow-md transition"
            >
              <img
                src={i.img}
                alt={i.nome}
                className="w-24 h-24 rounded-full border-2 border-blue-300 mb-4 sm:mb-0 sm:mr-6"
              />
              <div>
                <h3 className="font-semibold text-gray-700 text-lg mb-2">
                  {i.nome}
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li><strong>RM:</strong> {i.rm}</li>
                  <li><strong>Turma:</strong> {i.turma}</li>
                  <li><strong>Github:</strong> {i.github}</li>
                  <li><strong>Linkedin:</strong> {i.linkedin}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
