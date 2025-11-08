import { useState } from "react";
import Menu from "../Menu/Menu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-400 shadow-md md:flex-col relative">
      {/* Linha do título + botão */}
      <div className="flex items-center justify-between w-full md:justify-center md:flex-col md:bg-blue-500 md:h-full mr-10 ml-10">
        <h1 className="text-4xl font-bold text-white text-center md:mb-2">
          Saúde+
        </h1>

        {/* Botão hambúrguer só em mobile */}
        <button
          className="md:hidden flex flex-col gap-1 p-2 rounded hover:bg-blue-500 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Menu desktop */}
      <div className="hidden md:flex w-full justify-center">
        <Menu />
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-blue-400 shadow-lg z-40">
          <Menu isMobile />
        </div>
      )}
    </header>
  );
}
