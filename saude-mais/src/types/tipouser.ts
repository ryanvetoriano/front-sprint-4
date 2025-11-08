export type User = {
  idPaciente: number;        // ← aqui estava faltando o tipo
  nome: string;
  cpf: string;
  dataNascimento: string;
  sexo: string;
  telefone: string;
};
