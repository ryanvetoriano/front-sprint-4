import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Consulta } from "../../types/tipoConsulta";

export default function EditarConsultas() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Consulta>({
    data: "",
    hora: "",
    status: "",
    motivoConsulta: "",
    paciente: { idPaciente: Number(localStorage.getItem("idPaciente")) || 0 },
  });

  useEffect(() => {
    document.title = id ? "Editar Consulta" : "Cadastrar Consulta";

    const idPaciente = Number(localStorage.getItem("idPaciente"));
    if (!idPaciente) return;

    if (id) {
      fetch(`http://localhost:8080/consultas/${idPaciente}`)
        .then(res => res.json())
        .then((data: Consulta[]) => {
          const consulta = data.find(c => c.idConsulta === Number(id));
          if (consulta) {
            setForm({
              ...consulta,
              hora: consulta.hora.slice(0, 5),
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const salvarConsulta = async () => {
    const idPaciente = form.paciente?.idPaciente;
    if (!idPaciente) {
      alert("Paciente não identificado.");
      return;
    }

    const url = id
      ? `http://localhost:8080/consultas`
      : `http://localhost:8080/consultas?idPaciente=${idPaciente}`;
    const method = id ? "PUT" : "POST";

    const body = { ...form, paciente: { idPaciente } };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert(id ? "Consulta atualizada!" : "Consulta cadastrada!");
        navigate("/consultas");
      } else {
        alert("Erro ao salvar consulta");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar consulta");
    }
  };

  const excluirConsulta = async () => {
    if (!id) return;

    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta consulta?");
    if (!confirmDelete) return;

    const idPaciente = form.paciente?.idPaciente;
    if (!idPaciente) return;

    try {
      const res = await fetch(
        `http://localhost:8080/consultas/${id}?idPaciente=${idPaciente}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        alert("Consulta excluída!");
        navigate("/consultas");
      } else {
        alert("Erro ao excluir consulta");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir consulta");
    }
  };

  return (
    <main className="flex justify-center items-start md:items-center bg-blue-200 w-full min-h-[85vh] p-4">
      <div className="w-full max-w-md h-full flex justify-center">
        <form
          onSubmit={e => {
            e.preventDefault();
            salvarConsulta();
          }}
          className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-md flex flex-col gap-4 w-full overflow-y-auto max-h-[90vh]"
        >
          <h1 className="text-blue-300 text-lg sm:text-xl font-bold mb-4 text-center">
            {id ? "Editar Consulta" : "Cadastrar Consulta"}
          </h1>

          {/* Campos de formulário */}
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
            <span className="font-semibold text-gray-700 text-sm sm:text-base">Motivo:</span>
            <input
              type="text"
              name="motivoConsulta"
              value={form.motivoConsulta}
              onChange={handleChange}
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
              onClick={excluirConsulta}
              className="bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition text-sm sm:text-base"
            >
              Excluir Consulta
            </button>
          )}
        </form>
      </div>
    </main>
  );
}
