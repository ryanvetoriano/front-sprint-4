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
    <li className="flex flex-col md:flex-row justify-between items-center md:items-center bg-blue-100 p-3 sm:p-4 rounded shadow hover:shadow-md transition w-full max-w-lg md:max-w-2xl mx-auto mb-3">
      {/* Informações do exame: sempre em coluna para melhor visualização dos campos */}
      <div className="flex flex-col gap-1 sm:gap-2 text-gray-700 w-full">
        <span className="break-words">
          <strong>Data:</strong> {formatarData(receita.dataEmissao)}
        </span>
        <span className="break-words">
          <strong>Medicamento:</strong> {receita.medicamento || "Não informado"}
        </span>
        <span className="break-words">
          <strong>Dosagem:</strong> {receita.dosagem || "Não informado"}
        </span>
        <span className="break-words">
          <strong>Frequência:</strong> {receita.frequencia || "Não informado"}
        </span>
        <span className="break-words">
          <strong>Duração:</strong> {receita.duracao || "Não informado"}
        </span>
      </div>
      {/* Botão: Largura total no mobile, ajustado no desktop, com margem responsiva */}
      <button
        onClick={() => navigate(`/editar/receitas/${receita.idReceita}`)}
        className="mt-2 md:mt-0 md:ml-4 w-full md:w-auto text-center bg-blue-400 text-white font-bold py-2 px-2 rounded hover:bg-blue-500 transition"
      >
        Editar
      </button>
    </li>
  );
}
