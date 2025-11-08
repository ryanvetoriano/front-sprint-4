import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Exame } from "../../types/tipoExame";
import Botao from "../../components/BotaoProps/BotaoProps";
import ExameProps from "../../components/ExameProps/ExameProps";

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
    <main className="flex bg-blue-200 w-full min-h-screen justify-center items-center p-4">
      <div className="flex bg-gray-50 rounded w-full max-w-4xl max-h-[85vh] overflow-y-auto p-6 md:p-10 flex-col items-center shadow-lg">
        <h1 className="text-blue-400 font-bold text-2xl mb-6">Exames</h1>

        {exames.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-blue-400 font-semibold mb-4 bg-blue-100 p-1 rounded">
              **Nenhum exame cadastrado.**
            </p>
            <Botao
              texto="Cadastrar Primeiro Exame"
              onClick={() => navigate("/editar/exames")}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <ul className="w-full mb-6">
              {exames.map((e) => (
                <ExameProps key={e.idExame} exame={e} />
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