export type Consulta = {
  id: number;

  name: string;
  planoOfSaudeiton: string | undefined;

  startDate: string;
  endDate: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type GetConsultaOutput = Consulta &
  {
    startDate: string | number | Date;
    segundaConsulta: Consulta | null;
    consulta: Consulta | null;
  }[];

export type CreateConsultaInput = {
  name: string;
  planoOfSaudeiton: string | undefined;
  startDate: string;
  endDate: string;
};
