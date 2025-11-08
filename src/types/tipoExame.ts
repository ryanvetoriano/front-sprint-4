export type Exame = {
  idExame?: number;
  data: string;
  hora: string;
  status: string;
  tipoExame: string;
  local: string;
  paciente?: {
    idPaciente: number;
    nome?: string;
  };
};
