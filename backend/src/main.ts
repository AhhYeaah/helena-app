import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['verbose'],
  });

  // Safety middlewares.
  app.use(helmet());

  // Compressing responses for lower bandwidth.
  app.use(compression());

  await app.listen(3000);
}
bootstrap();
