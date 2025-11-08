import { useNavigate } from "react-router-dom";
import type { Consulta } from "../../types/tipoConsulta";

type Props = {
  consulta: Consulta;
};

export default function ConsultaProps({ consulta }: Props) {
  const navigate = useNavigate();

  const formatarData = (dataStr: string) => {
    if (!dataStr) return "Não informado";
    const [ano, mes, dia] = dataStr.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const formatarHora = (horaStr: string) => {
    if (!horaStr) return "Não informado";
    return horaStr.substring(0, 5);
  };

  return (
    <li className="flex flex-col md:flex-row justify-between items-center md:items-center bg-blue-100 p-3 sm:p-4 rounded shadow hover:shadow-md transition w-full max-w-lg md:max-w-2xl mx-auto mb-3">
      {/* Informações da consulta */}
      <div className="flex flex-col gap-1 sm:gap-2 text-gray-700 w-full">
        <span className="break-words">
          <strong>Data:</strong> {formatarData(consulta.data)}
        </span>
        <span className="break-words">
          <strong>Hora:</strong> {formatarHora(consulta.hora)}
        </span>
        <span className="break-words">
          <strong>Status:</strong> {consulta.status || "Não informado"}
        </span>
        <span className="break-words">
          <strong>Motivo:</strong> {consulta.motivoConsulta || "Não informado"}
        </span>
      </div>

      {/* Botão */}
      <button
        onClick={() => navigate(`/editar/consultas/${consulta.idConsulta}`)}
        className="mt-2 md:mt-0 md:ml-4 w-full md:w-auto text-center bg-blue-400 text-white font-bold py-2 px-2 rounded hover:bg-blue-500 transition"
      >
        Editar
      </button>
    </li>
  );
}
