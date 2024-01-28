import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateConsultaDto } from './dto/create-consulta';

@Injectable()
export class ConsultaService {
  constructor(private prisma: PrismaService) {}

  async getConsulta() {
    return await this.prisma.consulta.findMany();
  }

  async createConsulta(dto: CreateConsultaDto, segundaConsulta?: number) {
    return await this.prisma.consulta.create({
      data: { ...dto, segundaConsultaId: segundaConsulta ?? null },
    });
  }

  async deleteConsulta(id: number) {
    const consultas = await this.prisma.consulta.findFirst({
      where: {
        id: id,
      },
      include: {
        segundaConsulta: true,
        consulta: true,
      },
    });

    const ids = [];
    if (consultas?.consulta?.id) ids.push(consultas.consulta.id);
    if (consultas?.segundaConsulta?.id) ids.push(consultas.segundaConsulta.id);
    if (id) ids.push(id);

    await this.prisma.consulta.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
