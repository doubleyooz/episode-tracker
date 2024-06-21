import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SQLWrapper, and, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';
import { IResponseBody } from 'src/common/interceptors/response.interceptor';
import { CreateEpisodeRequest } from './dto/create-episode.dto';
import { UpdateEpisodeRequest } from './dto/update-episode.dto';
import { FindEpisodeRequest } from './dto/find-episode.dto';

const EPISODE_PROJECTION = {
  id: schema.episodes.id,
  title: schema.episodes.title,
  description: schema.episodes.description,
  finished: schema.episodes.finished,
};

@Injectable()
export class EpisodeService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly drizzle: NodePgDatabase<typeof schema>,
    private readonly configService: ConfigService,
  ) {}

  async doesAnimeExist(user_id: number, anime_id: number) {
    const result = await this.drizzle
      .select()
      .from(schema.animes)
      .where(
        and(eq(schema.animes.userId, user_id), eq(schema.animes.id, anime_id)),
      );
    console.log({ result });
    if (result.length === 0) throw new NotFoundException('Anime not found');
  }

  async create(
    user_id: number,
    episode: CreateEpisodeRequest,
  ): Promise<IResponseBody> {
    try {
      await this.doesAnimeExist(user_id, episode.animeId);
      console.log({ episode });
      const result = await this.drizzle
        .insert(schema.episodes)
        .values({
          title: episode.title,
          description: episode.description,
          finished: episode.finished,
          stoppedAtHours: episode.stoppedAtHours,
          stoppedAtMinutes: episode.stoppedAtMinutes,
          stoppedAtSeconds: episode.stoppedAtSeconds,
          animeId: episode.animeId,
        })
        .returning(EPISODE_PROJECTION);

      console.log({ result });
      return {
        result,
      };
    } catch (err) {
      console.log({ err });
      throw new BadRequestException(err);
    }
  }

  async updateEpisodeById(user_id: number, episode: UpdateEpisodeRequest) {
    await this.doesAnimeExist(user_id, episode.animeId);

    const result = await this.drizzle
      .update(schema.episodes)
      .set({
        ...episode,
      })
      .where(
        and(
          eq(schema.episodes.animeId, episode.animeId),
          eq(schema.episodes.id, episode.id),
        ),
      )
      .returning(EPISODE_PROJECTION);

    if (result.length === 0) throw new NotFoundException('Episode Not Found');
    return { result };
  }

  async findAll(_filter: FindEpisodeRequest) {
    const conditions: SQLWrapper[] = [];

    // Only add tokenVersion condition if _tokenVersion is defined
    if (_filter !== undefined) {
      if (_filter.description)
        conditions.push(eq(schema.episodes.description, _filter.description));
      if (_filter.title)
        conditions.push(eq(schema.episodes.title, _filter.title));
      if (_filter.animeId)
        conditions.push(eq(schema.episodes.animeId, _filter.animeId));
      if (_filter.id) conditions.push(eq(schema.episodes.id, _filter.id));
    }

    const result = await this.drizzle
      .select({
        id: schema.episodes.id,
        title: schema.episodes.title,
        description: schema.episodes.description,
        finished: schema.episodes.finished,
      })
      .from(schema.episodes)
      .where(and(...conditions));
    return { result };
  }

  async findOneById(_id: number) {
    const result = await this.drizzle
      .select(EPISODE_PROJECTION)
      .from(schema.episodes)
      .where(eq(schema.episodes.id, _id));
    if (result.length === 0) throw new NotFoundException('Episode not found');
    return { result: result };
  }

  async deleteById(
    user_id: number,
    anime_id: number,
    episode_id: number,
  ): Promise<any> {
    try {
      await this.doesAnimeExist(user_id, anime_id);
      const result = await this.drizzle
        .delete(schema.episodes)
        .where(
          and(
            eq(schema.episodes.animeId, anime_id),
            eq(schema.episodes.id, episode_id),
          ),
        );
      if (result.rowCount === 0)
        throw new NotFoundException('Episode Not Found or Invalid Credentials');

      return { result };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
