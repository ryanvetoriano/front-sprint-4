import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/tipouser";
import { useEffect } from "react";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cadastro";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    try {
      // Verifica se CPF já existe
      const res = await fetch(`http://localhost:8080/paciente?cpf=${data.cpf}`);
      const existingUsers: User[] = await res.json();

      if (existingUsers.length > 0) {
        alert("CPF já cadastrado!");
        return;
      }

      // Cria novo paciente
      const createRes = await fetch("http://localhost:8080/paciente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.nome,
          cpf: data.cpf,
          dataNascimento: data.dataNascimento,
          sexo: data.sexo,
          telefone: data.telefone,
        }),
      });

      if (!createRes.ok) throw new Error("Erro ao cadastrar paciente");

      // Salva CPF no localStorage para login automático
      localStorage.setItem("cpfUsuario", data.cpf);

      alert("Cadastro realizado com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar paciente.");
    }
  };

  return (
    <main className="flex bg-blue-200 w-[100vw] h-[90vh] justify-center items-center">
      <div className="flex flex-col bg-gray-50 rounded w-[50vw] p-10 items-center">
        <h2 className="text-blue-400 font-bold text-2xl mb-6">Cadastro</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          {/* Nome */}
          <label className="flex flex-col text-blue-300 font-bold">
            Nome:
            <input
              className="bg-blue-100 p-2 rounded text-blue-400 font-bold"
              placeholder="Digite seu nome"
              {...register("nome", { required: "Nome é obrigatório" })}
            />
            {errors.nome && (
              <p className="text-red-500 text-sm">{errors.nome.message}</p>
            )}
          </label>

          {/* CPF */}
          <label className="flex flex-col text-blue-300 font-bold">
            CPF:
            <input
              className="bg-blue-100 p-2 rounded text-blue-400 font-bold"
              placeholder="CPF"
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

          {/* Data de nascimento */}
          <label className="flex flex-col text-blue-300 font-bold">
            Data de nascimento:
            <input
              type="date"
              className="bg-blue-100 p-2 rounded text-blue-400 font-bold"
              {...register("dataNascimento", {
                required: "Data de nascimento é obrigatória",
              })}
            />
            {errors.dataNascimento && (
              <p className="text-red-500 text-sm">
                {errors.dataNascimento.message}
              </p>
            )}
          </label>

          {/* Sexo */}
          <label className="flex flex-col text-blue-300 font-bold">
            Sexo:
            <select
              className="bg-blue-100 p-2 rounded text-blue-400 font-bold"
              {...register("sexo", { required: "Selecione um sexo" })}
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
            {errors.sexo && (
              <p className="text-red-500 text-sm">{errors.sexo.message}</p>
            )}
          </label>

          {/* Telefone */}
          <label className="flex flex-col text-blue-300 font-bold">
            Telefone:
            <input
              className="bg-blue-100 p-2 rounded text-blue-400 font-bold"
              placeholder="Telefone"
              {...register("telefone", {
                required: "Telefone é obrigatório",
                pattern: {
                  value: /^\d{10,13}$/,
                  message: "Telefone deve conter entre 10 e 13 números",
                },
              })}
            />
            {errors.telefone && (
              <p className="text-red-500 text-sm">{errors.telefone.message}</p>
            )}
          </label>

          {/* Botão cadastrar */}
          <button
            type="submit"
            className="bg-blue-400 text-white font-bold py-2 rounded hover:bg-blue-500 transition"
          >
            Cadastrar
          </button>
        </form>

        {/* Botão voltar */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-400 hover:underline"
        >
          Ir para Login
        </button>
      </div>
    </main>
  );
}
