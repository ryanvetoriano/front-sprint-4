import { Link } from "react-router-dom";

interface MenuProps {
  isMobile?: boolean;
}

export default function Menu({ isMobile = false }: MenuProps) {
  const commonClasses = "bg-blue-400 text-white px-3 py-2 rounded font-bold hover:bg-blue-500 transition";

  return (
    <nav className={`${isMobile ? "flex flex-col gap-2" : "flex gap-1"} rounded`}>
      <Link to="/home" className={commonClasses}>Home</Link>
      <Link to="/consultas" className={commonClasses}>Consultas</Link>
      <Link to="/exames" className={commonClasses}>Exames</Link>
      <Link to="/receitas" className={commonClasses}>Receitas</Link>
      <Link to="/faq" className={commonClasses}>Faq</Link>
      <Link to="/paciente" className={commonClasses}>Perfil</Link>
      <Link to="/integrantes" className={commonClasses}>Integrantes</Link>
      <Link to="/contatos" className={commonClasses}>Contatos</Link>
      <Link to="/sobre" className={commonClasses}>Sobre</Link>
    </nav>
  );
}
