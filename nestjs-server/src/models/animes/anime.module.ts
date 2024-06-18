import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { DrizzleProvider } from '../../drizzle/drizzle.provider';
@Module({
  imports: [],
  providers: [AnimeService, ...DrizzleProvider],
  controllers: [AnimeController],
})
export class AnimeModule {}
