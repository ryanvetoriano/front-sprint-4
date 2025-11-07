import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Consulta } from "../../types/tipoConsulta";
import ConsultaProps from "../../components/ConsultaProps/ConsultaProps";
import Botao from "../../components/BotaoProps/BotaoProps";

export default function Consultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Consultas";

    const idPaciente = localStorage.getItem("idPaciente");
    if (!idPaciente) return;

    fetch(`http://localhost:8080/consultas/${idPaciente}`)
      .then(res => res.json())
      .then(data => setConsultas(data))
      .catch(err => console.error("Erro ao buscar consultas:", err));
  }, []);

  return (
    <main className="flex bg-blue-200 w-[100vw] h-[85vh] justify-center items-center">
      <div className="flex bg-gray-50 rounded w-[60vw] p-10 flex-col items-center">
        <h1 className="text-blue-400 font-bold text-2xl mb-6">Consultas</h1>

        {consultas.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-blue-400 font-semibold mb-4 bg-blue-100 p-1 rounded">
              Nenhuma consulta cadastrada.
            </p>
            <Botao
              texto="Cadastrar Primeira Consulta"
              onClick={() => navigate("/editar/consultas")}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <ul className="w-full mb-6">
              {consultas.map((c) => (
                <ConsultaProps key={c.idConsulta} consulta={c} />
              ))}
            </ul>

            <Botao
              texto="Adicionar Nova Consulta"
              onClick={() => navigate("/editar/consultas")}
            />
          </div>
        )}
      </div>
    </main>
  );
}
