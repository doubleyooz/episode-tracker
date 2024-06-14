import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: ConfigService = app.get(ConfigService);
  app.use(cookieParser());
  app.enableCors({ origin: appConfig.get('CLIENT'), credentials: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(appConfig.get<number>('PORT'));
}
bootstrap();
