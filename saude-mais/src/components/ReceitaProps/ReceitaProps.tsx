import { useNavigate } from "react-router-dom";
import type { Receita } from "../../types/tipoReceita";

type Props = {
  receita: Receita;
};

export default function ReceitaProps({ receita }: Props) {
  const navigate = useNavigate();

  // Formata data para DD/MM/AAAA
  const formatarData = (dataStr: string) => {
    if (!dataStr) return "Não informado";
    const [ano, mes, dia] = dataStr.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <li className="flex justify-between items-center bg-blue-100 p-4 rounded mb-3 shadow hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-700 flex-wrap">
        <span>
          <strong>Data:</strong> {formatarData(receita.dataEmissao)}
        </span>
        <span>
          <strong>Medicamento:</strong> {receita.medicamento || "Não informado"}
        </span>
        <span>
          <strong>Dosagem:</strong> {receita.dosagem || "Não informado"}
        </span>
        <span>
          <strong>Frequência:</strong> {receita.frequencia || "Não informado"}
        </span>
        <span>
          <strong>Duração:</strong> {receita.duracao || "Não informado"}
        </span>
      </div>
      <button
        onClick={() => navigate(`/editar/receitas/${receita.idReceita}`)}
        className="bg-blue-400 text-white font-bold py-2 px-3 rounded hover:bg-blue-500 transition"
      >
        Editar
      </button>
    </li>
  );
}
