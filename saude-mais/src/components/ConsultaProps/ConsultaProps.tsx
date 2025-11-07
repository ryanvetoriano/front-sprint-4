import { useNavigate } from "react-router-dom";
import type { Consulta } from "../../types/tipoConsulta";

type Props = {
  consulta: Consulta;
};

export default function ConsultaProps({ consulta }: Props) {
  const navigate = useNavigate();

  // Formata a data sem alterar o dia
  const formatarData = (dataStr: string) => {
    if (!dataStr) return "Não informado";
    const [ano, mes, dia] = dataStr.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  // Formata a hora para HH:mm
  const formatarHora = (horaStr: string) => {
    if (!horaStr) return "Não informado";
    return horaStr.substring(0, 5); // pega apenas HH:mm
  };

  return (
    <li className="flex justify-between items-center bg-blue-100 p-4 rounded mb-3 shadow hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-700 flex-wrap">
        <span>
          <strong>Data:</strong> {formatarData(consulta.data)}
        </span>
        <span>
          <strong>Hora:</strong> {formatarHora(consulta.hora)}
        </span>
        <span>
          <strong>Status:</strong> {consulta.status || "Não informado"}
        </span>
        <span>
          <strong>Motivo:</strong> {consulta.motivoConsulta || "Não informado"}
        </span>
      </div>
      <button
        onClick={() => navigate(`/editar/consultas/${consulta.idConsulta}`)}
        className="bg-blue-400 text-white font-bold py-2 px-1 rounded hover:bg-blue-500 transition"
      >
        Editar
      </button>
    </li>
  );
}
