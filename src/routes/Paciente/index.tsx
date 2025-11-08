import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/tipouser";

export default function Paciente() {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Partial<User>>({});
  const navigate = useNavigate();

  // Função para formatar a data para dd/mm/yyyy
  const formatDateBR = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    document.title = "Perfil";

    const cpfUsuario = localStorage.getItem("cpfUsuario");
    if (!cpfUsuario) {
      navigate("/");
      return;
    }

    // Busca paciente pelo CPF
    fetch(`https://java-sprint-4-latest.onrender.com/paciente?cpf=${cpfUsuario}`)
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

  // Atualizar informações do paciente via CPF
  const handleUpdate = async () => {
    if (!user) return;

    try {
      const res = await fetch(`https://java-sprint-4-latest.onrender.com/paciente/${user.cpf}`, {
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

  // Deletar conta do paciente via CPF
  const handleDelete = async () => {
    if (!user) return;

    if (!window.confirm("Tem certeza que deseja deletar sua conta?")) return;

    try {
      const res = await fetch(`https://java-sprint-4-latest.onrender.com/paciente/${user.cpf}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao deletar usuário");

      alert("Conta deletada com sucesso!");
      localStorage.removeItem("cpfUsuario");
      navigate("/"); // volta para login
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar a conta");
    }
  };

  if (!user)
    return <p className="text-center mt-10 text-gray-600">Carregando...</p>;

  return (
    <main className="bg-blue-200 h-full w-[100vw] flex justify-center items-center">
      <section className="bg-gray-50 p-8 rounded-lg shadow-md w-[90vw] max-w-md">
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
              value={form.dataNascimento ? form.dataNascimento.split("T")[0] : ""}
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
            <p><strong>Data de Nascimento:</strong> {formatDateBR(user.dataNascimento)}</p>
            <p><strong>Sexo:</strong> {user.sexo}</p>
            <p><strong>Telefone:</strong> {user.telefone}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setEditMode(true)}
                className="flex-1 bg-blue-400 text-white font-bold py-2 rounded hover:bg-blue-500 transition"
              >
                Editar Informações
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition"
              >
                Deletar Conta
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
