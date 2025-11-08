import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Exame } from "../../types/tipoExame";

export default function EditarExame() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Exame>({
    data: "",
    hora: "",
    status: "",
    tipoExame: "",
    local: "",
    paciente: { idPaciente: Number(localStorage.getItem("idPaciente")) || 0 },
  });

  useEffect(() => {
    document.title = id ? "Editar Exame" : "Cadastrar Exame";

    const idPaciente = Number(localStorage.getItem("idPaciente"));
    if (!idPaciente) return;

    if (id) {
      fetch(`http://localhost:8080/exames/${idPaciente}`)
        .then(res => res.json())
        .then((data: Exame[]) => {
          const exame = data.find(e => e.idExame === Number(id));
          if (exame) {
            setForm({
              ...exame,
              hora: exame.hora.slice(0, 5),
              paciente: { idPaciente },
            });
          }
        })
        .catch(err => console.error(err));
    } else {
      setForm(f => ({ ...f, paciente: { idPaciente } }));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const salvarExame = async () => {
    const idPaciente = form.paciente?.idPaciente;
    if (!idPaciente) {
      alert("Paciente não identificado.");
      return;
    }

    const url = id
      ? `http://localhost:8080/exames`
      : `http://localhost:8080/exames?idPaciente=${idPaciente}`;
    const method = id ? "PUT" : "POST";

    const body = { ...form, paciente: { idPaciente } };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert(id ? "Exame atualizado!" : "Exame cadastrado!");
        navigate("/exames");
      } else {
        alert("Erro ao salvar exame");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar exame");
    }
  };

  const excluirExame = async () => {
    if (!id) return;

    const confirmar = window.confirm("Tem certeza que deseja excluir este exame?");
    if (!confirmar) return;

    const idPaciente = form.paciente?.idPaciente;
    if (!idPaciente) return;

    try {
      const res = await fetch(
        `http://localhost:8080/exames/${id}?idPaciente=${idPaciente}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        alert("Exame excluído!");
        navigate("/exames");
      } else {
        alert("Erro ao excluir exame!");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir exame");
    }
  };

  return (
    <main className="flex justify-center items-start md:items-center bg-blue-200 w-full min-h-[85vh] p-4">
      <div className="w-full max-w-md h-full flex justify-center">
        <form
          onSubmit={e => { e.preventDefault(); salvarExame(); }}
          className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-md flex flex-col gap-4 w-full overflow-y-auto max-h-[90vh]"
        >
          <h1 className="text-blue-400 text-lg sm:text-xl font-bold mb-4 text-center">
            {id ? "Editar Exame" : "Cadastrar Exame"}
          </h1>

          {/* Campos do formulário */}
          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 text-sm sm:text-base">Data:</span>
            <input
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
              className="mt-1 p-2 text-sm sm:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 text-sm sm:text-base">Hora:</span>
            <input
              type="time"
              name="hora"
              value={form.hora}
              onChange={handleChange}
              className="mt-1 p-2 text-sm sm:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 text-sm sm:text-base">Status:</span>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 p-2 text-sm sm:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              required
            >
              <option value="">Selecione o status</option>
              <option value="Agendado">Agendado</option>
              <option value="Realizado">Realizado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 text-sm sm:text-base">Tipo do Exame:</span>
            <input
              type="text"
              name="tipoExame"
              value={form.tipoExame}
              onChange={handleChange}
              placeholder="Ex: Hemograma, Raio-X..."
              className="mt-1 p-2 text-sm sm:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 text-sm sm:text-base">Local:</span>
            <input
              type="text"
              name="local"
              value={form.local}
              onChange={handleChange}
              placeholder="Ex: Laboratório Central"
              className="mt-1 p-2 text-sm sm:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-blue-400 text-white font-bold py-2 rounded hover:bg-blue-500 transition text-sm sm:text-base"
          >
            {id ? "Atualizar" : "Cadastrar"}
          </button>

          {id && (
            <button
              type="button"
              onClick={excluirExame}
              className="bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition text-sm sm:text-base"
            >
              Excluir Exame
            </button>
          )}
        </form>
      </div>
    </main>
  );
}
