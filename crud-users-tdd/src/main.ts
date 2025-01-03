import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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