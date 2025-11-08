import { useEffect } from "react";

export default function Faq() {

  useEffect(() => {
      document.title = "Faq";
    }, []);
    
  const faqs = [
    {
      question: "O que é este site auxiliar ao HC?",
      answer:
        "R: Este site foi criado para oferecer suporte e facilitar o acesso a informações, agendamentos, orientações e serviços relacionados ao Hospital das Clínicas (HC). Ele complementa o site oficial com uma interface mais simples e rápida para determinados serviços.",
    },
    {
      question: "Este site substitui o site oficial do HC?",
      answer:
        "R: Não. Este site é apenas um complemento. Para informações institucionais, prontuário eletrônico e serviços oficiais, acesse diretamente o site oficial do HC.",
    },
    {
      question: "Posso marcar consultas ou exames por este site?",
      answer:
        "R: Em alguns casos, sim. O site oferece redirecionamento para a central de agendamentos do HC e orientações sobre como marcar exames ou consultas, inclusive com links diretos quando disponíveis.",
    },
    {
      question: "O site é seguro? Meus dados estão protegidos?",
      answer:
        "R: Sim. Este site segue boas práticas de segurança digital e apenas redireciona você para os canais oficiais do HC, sem armazenar informações sensíveis.",
    },
    {
      question: "Como posso acessar meu prontuário eletrônico?",
      answer:
        "R: O prontuário eletrônico está disponível exclusivamente no site oficial do HC. Aqui fornecemos instruções e links para você acessar com segurança através do portal oficial.",
    },
    {
      question: "Encontrei um erro ou link quebrado no site. O que fazer?",
      answer:
        "R: Se você encontrou um erro, envie um e-mail para nossa equipe de suporte através do formulário de contato ou pelo e-mail: emailsuporte@email.com.br.",
    },
    {
      question: "Este site é mantido pelo próprio Hospital das Clínicas?",
      answer:
        "R: Não diretamente. Este é um projeto auxiliar desenvolvido por voluntários/parceiros para facilitar o acesso e a navegação dos usuários. Todas as informações aqui são baseadas nos serviços reais do HC.",
    },
    {
      question: "Preciso de ajuda com login no portal do HC. Vocês ajudam?",
      answer:
        "R: Sim. Temos tutoriais passo a passo e suporte básico para ajudar você a acessar o portal do paciente. No entanto, problemas com senhas e dados cadastrais devem ser resolvidos diretamente com a equipe do HC.",
    },
    {
      question: "O site funciona em celulares?",
      answer:
        "R: Sim. O site auxiliar é responsivo e pode ser acessado normalmente por smartphones e tablets.",
    },
    {
      question: "Como entro em contato com o Hospital das Clínicas?",
      answer:
        "R: Na aba de Contatos você irá encontrar todas as informações necessárias para entrar em contato com o HC.",
    },
  ];

  return (
    <main className="bg-blue-200 h-[80vh] w-[100vw] flex justify-center py-10 px-4">
      <section className="bg-gray-50 p-8 rounded-lg shadow-md w-full max-w-3xl overflow-auto">
        <h2 className="text-2xl font-bold text-blue-300 mb-6">
          Perguntas Frequentes
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-blue-100 p-4 rounded shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-700 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
