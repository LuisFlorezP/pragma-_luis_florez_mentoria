import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  // Asegurar que exista el directorio de logs
  if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
  }

  const app = await NestFactory.create(AppModule);
  
  // Usar el logger de Winston como logger global
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('The users API description')
    .setVersion('1.0')
    .build();
  SwaggerModule.setup('api/documentation', app, SwaggerModule.createDocument(app, config));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();