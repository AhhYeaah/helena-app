import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppLoggerMiddleware } from './middlewares/app-logger.middleware';
import { PrismaService } from './services/prisma.service';
import { ConsultaModule } from './consulta/consulta.module';

@Module({
  imports: [ConsultaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
