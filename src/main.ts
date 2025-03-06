import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('API para gestionar publicaciones, usuarios y comentarios')
    .setVersion('1.0')
    .addTag('posts')
    .addTag('users')
    .addTag('comments')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  await app.listen(80);
}
bootstrap();