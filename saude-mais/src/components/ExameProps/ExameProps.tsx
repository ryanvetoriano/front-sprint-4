import { useNavigate } from "react-router-dom";
import type { Exame } from "../../types/tipoExame";

type Props = {
  exame: Exame;
};

export default function ExameProps({ exame }: Props) {
  const navigate = useNavigate();

  // Implementação da formatação de data (sincronizado com ConsultaProps)
  const formatarData = (dataStr: string) => {
    if (!dataStr) return "Não informado";
    const [ano, mes, dia] = dataStr.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  // Implementação da formatação de hora (sincronizado com ConsultaProps)
  const formatarHora = (horaStr: string) => {
    if (!horaStr) return "Não informado";
    return horaStr.substring(0, 5);
  };

  return (
    // Classes de responsividade e layout (sincronizado com ConsultaProps)
    <li className="flex flex-col md:flex-row justify-between items-center md:items-center bg-blue-100 p-3 sm:p-4 rounded shadow hover:shadow-md transition w-full max-w-lg md:max-w-2xl mx-auto mb-3">
      {/* Informações do exame - layout em coluna no mobile, linha no desktop */}
      <div className="flex flex-col gap-1 sm:gap-2 text-gray-700 w-full">
        <span className="break-words">
          <strong>Data:</strong> {formatarData(exame.data)}
        </span>
        <span className="break-words">
          <strong>Hora:</strong> {formatarHora(exame.hora)}
        </span>
        <span className="break-words">
          <strong>Status:</strong> {exame.status || "Não informado"}
        </span>
        <span className="break-words">
          <strong>Tipo:</strong> {exame.tipoExame || "Não informado"}
        </span>
        <span className="break-words">
          <strong>Local:</strong> {exame.local || "Não informado"}
        </span>
      </div>
      {/* Botão com classes de responsividade alinhadas */}
      <button
        onClick={() => navigate(`/editar/exames/${exame.idExame}`)}
        className="mt-2 md:mt-0 md:ml-4 w-full md:w-auto text-center bg-blue-400 text-white font-bold py-2 px-2 rounded hover:bg-blue-500 transition"
      >
        Editar
      </button>
    </li>
  );
}