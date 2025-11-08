import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './globals.css'

import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import Error from './routes/Error/index.tsx';
import Home from './routes/Home/index.tsx';
import Login from "./routes/Login/index.tsx";
import Register from "./routes/Register/index.tsx";
import Consultas from './routes/Consulta/index.tsx';
import EditarConsulta from "./routes/EditarConsulta/index.tsx"
import Exame from "./routes/Exame/index.tsx"
import EditarExame from './routes/EditarExame/index.tsx';
import ReceitaMedica from './routes/ReceitaMedica/index.tsx';
import EditarReceita from './routes/EditarReceita/index.tsx';
import Faq from './routes/Faq/index.tsx';
import Paciente from './routes/Paciente/index.tsx';
import Integrantes from './routes/Integrantes/index.tsx';
import Contato from './routes/Contato/index.tsx';
import Sobre from './routes/Sobre/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/home", element: <Home/> },
      { path: "/register", element: <Register/> },
      { path: "/consultas", element: <Consultas/>},
      { path: "/editar/consultas", element: <EditarConsulta/> },
      { path: "/editar/consultas/:id", element: <EditarConsulta/> },
      { path: "/exames", element: <Exame/>},
      { path: "/editar/exames", element: <EditarExame/> },
      { path: "/editar/exames/:id", element: <EditarExame/> },
      { path: "/receitas", element: <ReceitaMedica/>},
      { path: "/editar/receitas", element: <EditarReceita/>},
      { path: "/editar/receitas/:id", element: <EditarReceita/>},
      { path: "/faq", element: <Faq/>},
      { path: "/paciente", element: <Paciente/>},
      { path: "/integrantes", element: <Integrantes/>},
      { path: "/contatos", element: <Contato/>},
      { path: "/sobre", element: <Sobre/>}
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
