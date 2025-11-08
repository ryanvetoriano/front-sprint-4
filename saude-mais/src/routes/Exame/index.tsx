import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Exame } from "../../types/tipoExame";
import Botao from "../../components/BotaoProps/BotaoProps";

export default function Exames() {
  const [exames, setExames] = useState<Exame[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Exames";

    const idPaciente = localStorage.getItem("idPaciente");
    if (!idPaciente) return;

    fetch(`http://localhost:8080/exames/${idPaciente}`)
      .then(res => res.json())
      .then(data => setExames(data))
      .catch(err => console.error("Erro ao buscar exames:", err));
  }, []);

  return (
    <main className="flex bg-blue-200 w-[100vw] h-[85vh] justify-center items-center">
      <div className="flex bg-gray-50 rounded w-[60vw] p-10 flex-col items-center">
        <h1 className="text-blue-400 font-bold text-2xl mb-6">Exames</h1>

        {exames.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-blue-400 font-semibold mb-4 bg-blue-100 p-1 rounded">
              Nenhum exame cadastrado.
            </p>
            <Botao
              texto="Cadastrar Primeiro Exame"
              onClick={() => navigate("/editar/exames")}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <ul className="w-full mb-6">
              {exames.map((exame) => (
                <li
                  key={exame.idExame}
                  className="flex justify-between items-center bg-blue-100 p-4 rounded mb-3 shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-700 flex-wrap">
                    <span>
                      <strong>Data:</strong> {exame.data.split("-").reverse().join("/")}
                    </span>
                    <span>
                      <strong>Hora:</strong> {exame.hora.substring(0, 5)}
                    </span>
                    <span>
                      <strong>Status:</strong> {exame.status}
                    </span>
                    <span>
                      <strong>Tipo:</strong> {exame.tipoExame}
                    </span>
                    <span>
                      <strong>Local:</strong> {exame.local}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/editar/exames/${exame.idExame}`)}
                    className="bg-blue-400 text-white font-bold py-2 px-2 rounded hover:bg-blue-500 transition"
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>

            <Botao
              texto="Adicionar Novo Exame"
              onClick={() => navigate("/editar/exames")}
            />
          </div>
        )}
      </div>
    </main>
  );
}
