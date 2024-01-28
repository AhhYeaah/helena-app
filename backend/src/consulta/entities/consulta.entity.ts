export class ConsultaEntity {
  id: number;

  name: string;
  planoOfSaudeiton: string | undefined;

  startDate: Date;
  endDate: Date;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
