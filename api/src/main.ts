import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { accessTokenCookieKey } from './auth/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cookie parser middleware
  app.use(cookieParser()); // cookie parser middleware

  // setup transformation pipeline
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
    }),
  );

  // setup class serializer interceptor
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // setup swagger document
  const config = new DocumentBuilder()
    .setTitle('Api for TODO management system')
    .setDescription('The API description')
    .setVersion('1.0')
    .addCookieAuth(accessTokenCookieKey)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, document);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  // start the app
  await app.listen(3001);
}
bootstrap();
