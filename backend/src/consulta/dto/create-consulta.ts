import { ApiProperty } from '@nestjs/swagger';
import Validator from 'src/utils/Validator';

export class CreateConsultaDto {
  @ApiProperty({
    description: 'O nome do cliente',
    example: 'Matheus André',
  })
  name: string;

  @ApiProperty({
    description: 'Plano de saúde do cliente',
    example: 'IANSPE',
  })
  planoOfSaudeiton: string | undefined;

  @ApiProperty({
    description: 'Uma data para o inicio da consulta em formato ISO.',
    example: '2024-01-27T20:16:16.493Z',
  })
  startDate: Date;

  @ApiProperty({
    description: 'Uma data para o fim da consulta em formato ISO.',
    example: '2024-01-28T20:16:16.493Z',
  })
  endDate: Date;
}

export const CreateConsultaSchema = Validator.object({
  name: Validator.string(),
  planoOfSaudeiton: Validator.string().optional(),

  startDate: Validator.string().isoDate(),
  endDate: Validator.string().isoDate(),
})
  .options({ presence: 'required' })
  .required();
