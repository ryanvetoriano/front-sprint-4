import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/tipouser";
import { useEffect } from "react";

export default function Login() {
  const URL_API = "https://java-sprint-4-latest.onrender.com/paciente";
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    try {
      const res = await fetch(`${URL_API}?cpf=${data.cpf}`);
      if (!res.ok) throw new Error("Erro na resposta da API");

      const pacientes: User[] = await res.json();
      if (pacientes.length === 0) {
        alert("CPF não encontrado!");
        return;
      }

      const paciente = pacientes[0];
      localStorage.setItem("cpfUsuario", paciente.cpf);
      localStorage.setItem("idPaciente", paciente.idPaciente.toString());

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

          <button
            type="submit"
            className="bg-blue-400 text-white font-bold py-2 rounded hover:bg-blue-500 transition"
          >
            Entrar
          </button>
        </form>

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
