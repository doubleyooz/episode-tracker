import { Module } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { DrizzleProvider } from '../../drizzle/drizzle.provider';
@Module({
  imports: [],
  providers: [EpisodeService, ...DrizzleProvider],
  controllers: [EpisodeController],
})
export class EpisodeModule {}
