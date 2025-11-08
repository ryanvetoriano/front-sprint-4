import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

export default function App() {
  const location = useLocation(); 
  const isLoginPage = location.pathname === '/'; 
  const isRegisterPage = location.pathname === '/register';

  return (
    <div className="container">
      {!isLoginPage && !isRegisterPage && <Header />}
      <Outlet />
      <Footer />
    </div>
  );
}
