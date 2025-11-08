import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home";
  }, []);

  const cards = [
    { title: "Consultas", description: "Ver e agendar consultas", route: "/consultas" },
    { title: "Exames", description: "Ver e agendar exames", route: "/exames" },
    { title: "Receitas Médicas", description: "Visualizar e gerenciar receitas", route: "/receitas" },
    { title: "Perfil do Paciente", description: "Atualizar informações pessoais", route: "/paciente" },
    { title: "FAQ", description: "Perguntas frequentes", route: "/faq" },
    { title: "Contatos", description: "Entre em contato com o HC e nossa equipe", route: "/contatos" },
  ];

  return (
    <main className="flex flex-col bg-blue-200 h-full w-[100vw] justify-center items-center">
      <section className="text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Bem-vindo ao Site Auxiliar do HC</h1>
        <p className="text-gray-50 font-bold">
          Facilite o acesso a informações, agendamentos e serviços do Hospital das Clínicas
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.route)}
            className="bg-gray-50 p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition flex flex-col justify-between"
          >
            <h2 className="text-xl font-bold text-blue-400 mb-2">{card.title}</h2>
            <p className="text-gray-700 mb-4">{card.description}</p>
            <button className="mt-auto bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500 transition">
              Acessar
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
