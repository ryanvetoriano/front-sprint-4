import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Receita } from "../../types/tipoReceita";
import ReceitaProps from "../../components/ReceitaProps/ReceitaProps";
import Botao from "../../components/BotaoProps/BotaoProps";

export default function Receitas() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Receitas";

    const idPaciente = localStorage.getItem("idPaciente");
    if (!idPaciente) return;

    fetch(`http://localhost:8080/receitas/${idPaciente}`)
      .then(res => res.json())
      .then(data => setReceitas(data))
      .catch(err => console.error("Erro ao buscar receitas:", err));
  }, []);

  return (
    <main className="flex bg-blue-200 w-[100vw] h-[85vh] justify-center items-center">
      <div className="flex bg-gray-50 rounded w-[60vw] p-10 flex-col items-center">
        <h1 className="text-blue-400 font-bold text-2xl mb-6">Receitas</h1>

        {receitas.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-blue-400 font-semibold mb-4 bg-blue-100 p-1 rounded">
              Nenhuma receita cadastrada.
            </p>
            <Botao
              texto="Cadastrar Primeira Receita"
              onClick={() => navigate("/editar/receitas")}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <ul className="w-full mb-6">
              {receitas.map((r) => (
                <ReceitaProps key={r.idReceita} receita={r} />
              ))}
            </ul>

            <Botao
              texto="Adicionar Nova Receita"
              onClick={() => navigate("/editar/receitas")}
            />
          </div>
        )}
      </div>
    </main>
  );
}
