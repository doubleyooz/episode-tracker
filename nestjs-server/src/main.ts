import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const CORS_OPTIONS = {
    origin: [process.env.CLIENT], // or '*' or whatever is required
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
    ],
    exposedHeaders: 'Authorization',
    credentials: true,
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  };
  const adapter = new FastifyAdapter();
  adapter.enableCors(CORS_OPTIONS);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );
  const appConfig: ConfigService = app.get(ConfigService);

  app.use(cookieParser());

  // app.enableCors({ origin: appConfig.get('CLIENT'), credentials: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(appConfig.get<number>('PORT'), '0.0.0.0');
}
bootstrap();
