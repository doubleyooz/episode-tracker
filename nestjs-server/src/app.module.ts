import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { UserModule } from './models/users/user.module';
import { AuthModule } from './auth/auth.module';
import { AnimeModule } from './models/animes/anime.module';
import { ListModule } from './models/lists/list.module';
import { EpisodeModule } from './models/episodes/episode.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.number().required(),
        HASH_SALT: Joi.number().required(),
        SMTP_KEY: Joi.string().required(),
        SMTP_USER: Joi.string().required(),
        SMTP_HOST: Joi.string().required(),
        SMTP_SENDER: Joi.string().required(),
      }),
      isGlobal: true,
    }),

    DrizzleModule,
    UserModule,
    ListModule,
    EpisodeModule,
    AnimeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
