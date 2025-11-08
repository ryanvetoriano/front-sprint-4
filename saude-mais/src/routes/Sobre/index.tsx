import { useEffect } from "react";

export default function Sobre() {
  useEffect(() => {
    document.title = "Sobre o Projeto";
  }, []);

  return (
    <main className="bg-blue-200 h-full w-[100vw] flex justify-center items-center">
      <section className="bg-gray-50 p-8 rounded-lg shadow-md max-w-3xl">
        <h1 className="text-3xl font-bold text-blue-300 mb-6 text-center">
          Sobre o Projeto
        </h1>

        <p className="text-gray-700 mb-4 bg-blue-100 rounded p-1">
          Este site foi desenvolvido como um **projeto auxiliar ao Hospital das
          Clínicas (HC)** com o objetivo de oferecer uma interface simples,
          rápida e organizada para acessar informações sobre consultas, exames,
          receitas médicas, FAQ, contatos e perfil do paciente.
        </p>

        <p className="text-gray-700 mb-4 bg-blue-100 rounded p-1">
          O projeto não substitui o site oficial do HC. Todas as informações
          oficiais e o acesso a prontuários eletrônicos permanecem no portal
          oficial do hospital. Nosso objetivo é **facilitar a navegação e
          agilizar o acesso a serviços**, proporcionando uma experiência mais
          intuitiva para os usuários.
        </p>

        <p className="text-gray-700 mb-4 bg-blue-100 rounded p-1">
          O site é mantido por **voluntários e parceiros**, que buscam apoiar
          pacientes e visitantes com informações precisas e links diretos para
          os serviços oficiais. Nenhum dado sensível é armazenado, garantindo a
          **segurança e privacidade dos usuários**.
        </p>

        <p className="text-gray-700 mb-4 bg-blue-100 rounded p-1">
          Esperamos que esta ferramenta seja útil e torne o acesso aos serviços
          do HC mais prático e eficiente.
        </p>

        <div className="mt-6 text-center">
          <button
            onClick={() => (window.location.href = "/contatos")}
            className="bg-blue-400 text-white py-2 px-6 rounded hover:bg-blue-500 transition"
          >
            Fale Conosco
          </button>
        </div>
      </section>
    </main>
  );
}
