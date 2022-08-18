import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: process.env.CLIENT_URL,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Flea Market')
    .setDescription('우아한 중고거래 API')
    .build();

  const swaggerdocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerdocument);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
