import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import { ACCESS_SESSION_ID } from './constants/session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Flea Market')
    .setDescription('우아한 중고거래 API')
    .addCookieAuth(ACCESS_SESSION_ID)
    .build();

  const swaggerdocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerdocument);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
