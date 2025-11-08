import { useNavigate } from "react-router-dom";
import type { Exame } from "../../types/tipoExame";

type Props = {
  exame: Exame;
};

export default function ExameProps({ exame }: Props) {
  const navigate = useNavigate();

  return (
    <li className="flex justify-between items-center bg-blue-100 p-4 rounded mb-3 shadow hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-700 flex-wrap">
        <span>
          <strong>Data:</strong> {exame.data}
        </span>
        <span>
          <strong>Hora:</strong> {exame.hora}
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
        className="bg-blue-400 text-white font-bold py-2 px-3 rounded hover:bg-blue-500 transition"
      >
        Editar
      </button>
    </li>
  );
}
