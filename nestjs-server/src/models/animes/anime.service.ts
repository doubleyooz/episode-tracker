import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';
import { IResponseBody } from 'src/common/interceptors/response.interceptor';
import { CreateAnimeRequest } from './dto/create-anime.dto';
import { UpdateAnimeRequest } from './dto/update-anime.dto';

@Injectable()
export class AnimeService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly drizzle: NodePgDatabase<typeof schema>,
    private readonly configService: ConfigService,
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

  async findAll() {
    const result = await this.drizzle
      .select({
        id: schema.animes.id,
        title: schema.animes.title,
        description: schema.animes.description,
        studio: schema.animes.studio,
        allowGaps: schema.animes.allowGaps,
        finished: schema.animes.finished,
        numberOfEpisodes: schema.animes.numberOfEpisodes,
        episodes: schema.episodes,
      })
      .from(schema.animes)
      .fullJoin(schema.episodes, eq(schema.animes.id, schema.episodes.animeId));
    return { result: result };
  }

  async findOneById(_id: number) {
    const result = await this.drizzle
      .select({
        id: schema.animes.id,
        title: schema.animes.title,
        description: schema.animes.description,
        studio: schema.animes.studio,
      })
      .from(schema.animes)
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
