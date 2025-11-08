type BotaoProps = {
  texto: string;
  onClick: () => void;
  cor?: string;
};

export default function Botao({ texto, onClick }: BotaoProps) {
  return (
    <button
      className="bg-blue-400 text-white font-bold py-2 px-3 rounded hover:bg-blue-500 transition"
      onClick={onClick}
    >
      {texto}
    </button>
  );
}
