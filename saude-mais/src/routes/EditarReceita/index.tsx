import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Receita } from "../../types/tipoReceita";

export default function EditarReceitas() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Receita>({
    dataEmissao: "",
    medicamento: "",
    dosagem: "",
    frequencia: "",
    duracao: "",
    paciente: { idPaciente: Number(localStorage.getItem("idPaciente")) || 0 },
  });

  useEffect(() => {
    document.title = id ? "Editar Receita" : "Cadastrar Receita";

    const idPaciente = Number(localStorage.getItem("idPaciente"));
    if (!idPaciente) return;

    if (id) {
      fetch(`https://java-sprint-4-latest.onrender.com/receitas/${idPaciente}`)
        .then(res => res.json())
        .then((data: Receita[]) => {
          const receita = data.find(r => r.idReceita === Number(id));
          if (receita) {
            setForm({
              ...receita,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const salvarReceita = async () => {
    const idPaciente = form.paciente?.idPaciente;
    if (!idPaciente) {
      alert("Paciente não identificado.");
      return;
    }

    const url = id
      ? `https://java-sprint-4-latest.onrender.com/receitas`
      : `https://java-sprint-4-latest.onrender.com/receitas?idPaciente=${idPaciente}`;
    const method = id ? "PUT" : "POST";

    const body = { ...form, paciente: { idPaciente } };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert(id ? "Receita atualizada!" : "Receita cadastrada!");
        navigate("/receitas");
      } else {
        alert("Erro ao salvar receita");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar receita");
    }
  };

  const excluirReceita = async () => {
    if (!id) return;

    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta receita?");
    if (!confirmDelete) return;

    const idPaciente = form.paciente?.idPaciente;
    if (!idPaciente) return;

    try {
      const res = await fetch(
        `https://java-sprint-4-latest.onrender.com/receitas/${id}?idPaciente=${idPaciente}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        alert("Receita excluída!");
        navigate("/receitas");
      } else {
        alert("Erro ao excluir receita");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir receita");
    }
  };

  return (
    <main className="flex justify-center items-start md:items-center bg-blue-200 w-full min-h-[85vh] p-4">
      <div className="w-full max-w-md h-full flex justify-center">
        <form
          onSubmit={e => { e.preventDefault(); salvarReceita(); }}
          className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-md flex flex-col gap-4 w-full overflow-y-auto max-h-[90vh]"
        >
          <h1 className="text-blue-300 text-lg sm:text-xl font-bold mb-4 text-center">
            {id ? "Editar Receita" : "Cadastrar Receita"}
          </h1>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 text-sm sm:text-base">Data de Emissão:</span>
            <input
              type="date"
              name="dataEmissao"
              value={form.dataEmissao}
              onChange={handleChange}
              className="mt-1 p-2 text-sm sm:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 text-sm sm:text-base">Medicamento:</span>
            <input
              type="text"
              name="medicamento"
              value={form.medicamento}
              onChange={handleChange}
              className="mt-1 p-2 text-sm sm:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 text-sm sm:text-base">Dosagem:</span>
            <input
              type="text"
              name="dosagem"
              value={form.dosagem}
              onChange={handleChange}
              className="mt-1 p-2 text-sm sm:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 text-sm sm:text-base">Frequência:</span>
            <input
              type="text"
              name="frequencia"
              value={form.frequencia}
              onChange={handleChange}
              className="mt-1 p-2 text-sm sm:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-gray-700 text-sm sm:text-base">Duração:</span>
            <input
              type="text"
              name="duracao"
              value={form.duracao}
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
              onClick={excluirReceita}
              className="bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition text-sm sm:text-base"
            >
              Excluir Receita
            </button>
          )}
        </form>
      </div>
    </main>

  );
}
