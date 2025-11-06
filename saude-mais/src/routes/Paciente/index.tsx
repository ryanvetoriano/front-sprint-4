import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/tipouser";

export default function Paciente() {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Partial<User>>({});
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Perfil";

    // Pega o CPF do usuário logado
    const cpfUsuario = localStorage.getItem("cpfUsuario");
    if (!cpfUsuario) {
      navigate("/"); // se não estiver logado, redireciona para login
      return;
    }

    // Busca paciente pelo CPF
    fetch(`http://localhost:8080/paciente?cpf=${cpfUsuario}`)
      .then((res) => res.json())
      .then((data: User[]) => {
        if (data.length === 0) {
          alert("Paciente não encontrado!");
          navigate("/");
          return;
        }
        setUser(data[0]);
        setForm(data[0]);
      })
      .catch((err) => console.error(err));
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!user) return;

    try {
      const res = await fetch(`http://localhost:8080/paciente/${user.idPaciente}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Erro ao atualizar usuário");

      const updatedUser: User = await res.json();
      setUser(updatedUser);
      setEditMode(false);
      alert("Informações atualizadas com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar informações");
    }
  };

  if (!user)
    return <p className="text-center mt-10 text-gray-600">Carregando...</p>;

  return (
    <main className="bg-blue-200 h-full w-[100vw] flex justify-center items-center">
      <section className="bg-gray-50 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-300 mb-6 text-center">
          Perfil do Paciente
        </h1>

        {editMode ? (
          <div className="flex flex-col gap-4">
            <input
              name="nome"
              value={form.nome || ""}
              onChange={handleChange}
              placeholder="Nome"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              name="cpf"
              value={form.cpf || ""}
              onChange={handleChange}
              placeholder="CPF"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              name="dataNascimento"
              value={form.dataNascimento || ""}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <select
              name="sexo"
              value={form.sexo || ""}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
            <input
              name="telefone"
              value={form.telefone || ""}
              onChange={handleChange}
              placeholder="Telefone"
              className="p-2 border border-gray-300 rounded"
            />
            <div className="flex gap-4">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-blue-400 text-white font-bold py-2 rounded hover:bg-blue-500 transition"
              >
                Salvar Alterações
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="flex-1 bg-gray-300 text-gray-700 font-bold py-2 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 text-gray-700">
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>CPF:</strong> {user.cpf}</p>
            <p><strong>Data de Nascimento:</strong> {user.dataNascimento}</p>
            <p><strong>Sexo:</strong> {user.sexo}</p>
            <p><strong>Telefone:</strong> {user.telefone}</p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-blue-400 text-white font-bold py-2 rounded hover:bg-blue-500 transition"
            >
              Editar Informações
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
