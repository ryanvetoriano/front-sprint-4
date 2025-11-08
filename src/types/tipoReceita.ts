export interface Receita {
  idReceita?: number;
  dataEmissao: string;
  medicamento: string;
  dosagem: string;
  frequencia: string;
  duracao: string;
  paciente?: {
    idPaciente: number;
    nome?: string;
  };
}
