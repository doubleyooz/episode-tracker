import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SQLWrapper, and, eq, isNotNull } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';
import { IResponseBody } from 'src/common/interceptors/response.interceptor';
import { CreateAnimeRequest } from './dto/create-anime.dto';
import { UpdateAnimeRequest } from './dto/update-anime.dto';
import { FindAnimeRequest } from './dto/find-anime.dto';

const ANIME_PROJECTION = {
  id: schema.animes.id,
  title: schema.animes.title,
  description: schema.animes.description,
  studio: schema.animes.studio,
  allowGaps: schema.animes.allowGaps,
  finished: schema.animes.finished,
  userId: schema.animes.userId,
  numberOfEpisodes: schema.animes.numberOfEpisodes,
  episodes: schema.episodes,
};

@Injectable()
export class AnimeService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly drizzle: NodePgDatabase<typeof schema>,
  ) {}

  async create(id: number, anime: CreateAnimeRequest): Promise<IResponseBody> {
    try {
      await this.drizzle.insert(schema.animes).values({
        title: anime.title,
        description: anime.description,
        finished: anime.finished,
        studio: anime.studio,
        userId: id,
      });

      return { result: { title: anime.title, description: anime.description } };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async updateAnimeById(user_id: number, anime: UpdateAnimeRequest) {
    const result = await this.drizzle
      .update(schema.animes)
      .set({
        ...anime,
      })
      .where(
        and(eq(schema.animes.userId, user_id), eq(schema.animes.id, anime.id)),
      )
      .returning({
        title: schema.animes.title,
        description: schema.animes.description,
      });

    if (result.length === 0)
      throw new NotFoundException('Anime Not Found or Invalid Credentials');
    return { result };
  }

  async findAll(_filter: FindAnimeRequest) {
    const conditions: SQLWrapper[] = [];

    // Only add tokenVersion condition if _tokenVersion is defined
    if (_filter !== undefined) {
      if (_filter.description)
        conditions.push(eq(schema.animes.description, _filter.description));
      if (_filter.title)
        conditions.push(eq(schema.animes.title, _filter.title));
      if (_filter.userId)
        conditions.push(eq(schema.animes.userId, _filter.userId));
      if (_filter.id) conditions.push(eq(schema.animes.id, _filter.id));
    }

    const result = await this.drizzle
      .select(ANIME_PROJECTION)

      .from(schema.animes)
      .fullJoin(schema.episodes, eq(schema.animes.id, schema.episodes.animeId))
      .where(and(...conditions, isNotNull(schema.animes.id)));
    return { result: result };
  }

  async findOneById(_id: number) {
    const result = await this.drizzle
      .select(ANIME_PROJECTION)
      .from(schema.animes)
      .fullJoin(schema.episodes, eq(schema.animes.id, schema.episodes.animeId))
      .where(eq(schema.animes.id, _id));
    if (result.length === 0) throw new NotFoundException('Anime not found');
    return { result: result };
  }

  async deleteById(user_id: number, anime_id: number): Promise<any> {
    const result = await this.drizzle
      .delete(schema.animes)
      .where(
        and(eq(schema.animes.userId, user_id), eq(schema.animes.id, anime_id)),
      );
    if (result.rowCount === 0)
      throw new NotFoundException('Anime Not Found or Invalid Credentials');

    return { result };
  }
}
