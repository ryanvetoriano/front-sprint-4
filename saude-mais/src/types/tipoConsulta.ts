export type Consulta = {
  idConsulta?: number;
  data: string;
  hora: string;
  status: string;
  motivoConsulta: string;
  paciente?: {
    idPaciente: number;
    nome?: string;
  };
};
