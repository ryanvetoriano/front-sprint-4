import telefone from "../../img/telefone.svg";
import wpp from "../../img/whatsapp.svg";
import logo from "../../img/logohc.png";
import facebook from "../../img/facebook.svg";
import youtube from "../../img/youtube.svg";
import instagram from "../../img/instagram.svg";
import x from "../../img/x.svg";
import linkedin from "../../img/linkedin.svg";
import { useEffect } from "react";

export default function Contato() {

  useEffect(() => {
    document.title = "Contatos";
  }, []);

  return (
    <main className="bg-blue-200 w-full min-h-screen flex justify-center items-center py-12 px-4">
      {/* Container responsivo: usa largura total no mobile, max-w-4xl no desktop, altura automática e sombra aprimorada */}
      <section className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-4xl flex flex-col gap-8 md:gap-10">

        {/* Contato do time */}
        <div>
          {/* Título com separador */}
          <h2 className="text-3xl font-extrabold text-blue-400 mb-4 border-b-2 border-blue-300 pb-2">
            Nossos Contatos (Time)
          </h2>
          <h3 className="font-semibold text-blue-400 mb-3 text-lg">
            Contate o nosso time:
          </h3>
          {/* Lista de e-mails com melhor visualização no mobile (break-words) */}
          <p className="text-gray-700 bg-blue-100 rounded-lg shadow-inner p-3 text-sm sm:text-base break-words">
            <strong className="font-bold">E-mails:</strong> rm565667@fiap.com.br - rm561722@fiap.com.br - rm564002@fiap.com.br
          </p>
        </div>

        {/* Contato do HC */}
        <div>
          <h2 className="text-3xl font-extrabold text-blue-400 mb-4 border-b-2 border-blue-300 pb-2">
            Contatos do HC (Hospital das Clínicas)
          </h2>
          {/* Flex-wrap para garantir que os itens quebrem a linha no mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 flex-wrap">
            {/* Telefone */}
            <div className="flex items-center gap-2 bg-blue-100 rounded-lg shadow p-3 flex-1 min-w-[200px]">
              <img src={telefone} alt="telefone" className="w-6 h-6" />
              <p className="text-gray-700 font-semibold">(11) 2661-0000</p>
            </div>
            {/* WhatsApp */}
            <div className="flex items-center gap-2 bg-blue-100 rounded-lg shadow p-3 flex-1 min-w-[200px]">
              <img src={wpp} alt="whatsapp" className="w-6 h-6" />
              <p className="text-gray-700 font-semibold">(81) 2126-3757</p>
            </div>
            {/* Site Link */}
            <a
              href="https://www.hc.fm.usp.br/hc/portal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-700 bg-blue-100 rounded-lg shadow p-3 hover:bg-blue-300 transition duration-300 flex-1 min-w-[200px]"
            >
              {/* Logo ajustada */}
              <img src={logo} alt="link" className="w-8 h-8 object-contain" />
              <span className="font-semibold">Site Oficial HC</span>
            </a>
          </div>
        </div>

        {/* Redes sociais */}
        <div>
          <h2 className="text-3xl font-extrabold text-blue-400 mb-4 border-b-2 border-blue-300 pb-2">
            Acompanhe o HC nas Redes
          </h2>
          {/* Flex-wrap e padding maior para os ícones, aumentando a área de toque */}
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-start">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/hospitaldasclinicasdafmusp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition p-2 rounded-full bg-blue-500/10"
            >
              <img src={facebook} alt="facebook" className="w-8 h-8 sm:w-10 sm:h-10" />
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/hospitalhcfmusp/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition p-2 rounded-full bg-blue-500/10"
            >
              <img src={instagram} alt="instagram" className="w-8 h-8 sm:w-10 sm:h-10" />
            </a>
            {/* LinkedIn (Link corrigido) */}
            <a
              href="https://www.linkedin.com/company/hospital-das-clinicas-fm-usp/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition p-2 rounded-full bg-blue-500/10"
            >
              <img src={linkedin} alt="linkedin" className="w-8 h-8 sm:w-10 sm:h-10" />
            </a>
            {/* X (Twitter) */}
            <a
              href="https://x.com/hospitalHCFMUSP"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition p-2 rounded-full bg-blue-500/10"
            >
              <img src={x} alt="x" className="w-8 h-8 sm:w-10 sm:h-10" />
            </a>
            {/* Youtube */}
            <a
              href="https://www.youtube.com/channel/UC_DUjcI35Hm0ix74KDQ67Jw/featured"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition p-2 rounded-full bg-blue-500/10"
            >
              <img src={youtube} alt="youtube" className="w-8 h-8 sm:w-10 sm:h-10" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}