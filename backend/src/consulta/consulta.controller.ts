import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConsultaService } from './consulta.service';
import { Validate } from 'src/pipes/validation.pipe';
import { CreateConsultaDto, CreateConsultaSchema } from './dto/create-consulta';
import { transformIdIntoNumber } from 'src/utils/Params';
import { addMonths } from 'date-fns';

@ApiTags('consulta')
@Controller('consulta')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @Get()
  async getConsultas() {
    return await this.consultaService.getConsulta();
  }

  @Post()
  @Validate(CreateConsultaSchema)
  async createConsulta(@Body() consulta: CreateConsultaDto) {
    //primeira consulta
    const primeiraConsulta =
      await this.consultaService.createConsulta(consulta);

    //segunda consulta
    await this.consultaService.createConsulta(
      {
        name: `Segunda Consulta - ${consulta.name}`,
        planoOfSaudeiton: consulta.planoOfSaudeiton,
        startDate: addMonths(consulta.startDate, 6),
        endDate: addMonths(consulta.endDate, 6),
      },
      primeiraConsulta.id,
    );
  }

  @Delete('/:id')
  @Validate(CreateConsultaSchema)
  async deleteConsulta(@Param('id') id: string) {
    const idNum = transformIdIntoNumber(id);

    await this.consultaService.deleteConsulta(idNum);
  }
}
