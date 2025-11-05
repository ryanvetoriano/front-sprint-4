import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/tipouser";
import { useEffect } from "react";

export default function Login() {

  const URL_API = "http://localhost:8080/paciente"

  useEffect(() => {
      document.title = "Login";

      async function GetApi() {
        const response = await fetch(URL_API);
        const data = await response.json();
        console.log(data);
      }

      GetApi();
    }, []);
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      console.log("Dados enviados:", data);

      // Busca usuário pelo CPF
      const res = await fetch(`http://localhost:8080/paciente?cpf=${data.cpf}`);

      if (!res.ok) throw new Error("Erro na resposta da API");

      const users: User[] = await res.json();
      console.log("Usuários encontrados:", users);

      if (users.length === 0) {
        alert("CPF não encontrado!");
        return;
      }

      const user = users[0];
      localStorage.setItem("usuarioId", String(user.id));

      navigate("/home");
    } catch (error) {
      console.error("Erro ao logar:", error);
      alert("Erro ao tentar logar.");
    }
  };

  return (
    <main className="flex bg-blue-200 w-[100vw] h-[90vh] justify-center items-center">
      <div className="flex flex-col bg-gray-50 rounded w-[50vw] p-10 items-center">
        <h2 className="text-blue-400 font-bold text-2xl mb-6">Login</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          {/* CPF */}
          <label className="flex flex-col text-blue-300 font-bold">
            CPF:
            <input
              className="bg-blue-100 p-2 rounded text-blue-400 font-bold"
              placeholder="Digite seu CPF"
              {...register("cpf", {
                required: "CPF é obrigatório",
                pattern: {
                  value: /^\d{11}$/,
                  message: "CPF deve conter 11 dígitos",
                },
              })}
            />
            {errors.cpf && (
              <p className="text-red-500 text-sm">{errors.cpf.message}</p>
            )}
          </label>

          {/* Botão login */}
          <button
            type="submit"
            className="bg-blue-400 text-white font-bold py-2 rounded hover:bg-blue-500 transition"
          >
            Entrar
          </button>
        </form>

        {/* Ir para cadastro */}
        <button
          onClick={() => navigate("/register")}
          className="mt-4 text-blue-400 hover:underline"
        >
          Ir para Cadastro
        </button>
      </div>
    </main>
  );
}