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
import { CreateReviewRequest } from './dto/create-review.dto';
import { UpdateReviewRequest } from './dto/update-review.dto';
import { FindReviewRequest } from './dto/find-review.dto';

const REVIEW_PROJECTION = {
  id: schema.reviews.id,
  description: schema.reviews.description,
  finished: schema.reviews.finished,
  animeId: schema.reviews.animeId,
};

@Injectable()
export class ReviewService {
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
    review: CreateReviewRequest,
  ): Promise<IResponseBody> {
    try {
      await this.doesAnimeExist(user_id, review.animeId);
      console.log({ review });
      const result = await this.drizzle
        .insert(schema.reviews)
        .values({
          description: review.description,
          finished: review.finished,
          userId: user_id,
          animeId: review.animeId,
        })
        .returning(REVIEW_PROJECTION);

      console.log({ result });
      return {
        result,
      };
    } catch (err) {
      console.log({ err });
      throw new BadRequestException(err);
    }
  }

  async updateReviewById(user_id: number, review: UpdateReviewRequest) {
    const result = await this.drizzle
      .update(schema.reviews)
      .set({
        ...review,
      })
      .where(
        and(
          eq(schema.reviews.userId, user_id),
          eq(schema.reviews.id, review.id),
        ),
      )
      .returning(REVIEW_PROJECTION);

    if (result.length === 0) throw new NotFoundException('Review Not Found');
    return { result };
  }

  async findAll(_filter: FindReviewRequest) {
    const conditions: SQLWrapper[] = [];

    // Only add tokenVersion condition if _tokenVersion is defined
    if (_filter !== undefined) {
      if (_filter.description)
        conditions.push(eq(schema.reviews.description, _filter.description));

      if (_filter.animeId)
        conditions.push(eq(schema.reviews.animeId, _filter.animeId));
      if (_filter.id) conditions.push(eq(schema.reviews.id, _filter.id));
    }

    const result = await this.drizzle
      .select(REVIEW_PROJECTION)
      .from(schema.reviews)
      .where(and(...conditions));
    return { result };
  }

  async findOneById(_id: number) {
    const result = await this.drizzle
      .select(REVIEW_PROJECTION)
      .from(schema.reviews)
      .where(eq(schema.reviews.id, _id));
    if (result.length === 0) throw new NotFoundException('Review not found');
    return { result: result };
  }

  async deleteById(user_id: number, review_id: number): Promise<any> {
    try {
      const result = await this.drizzle
        .delete(schema.reviews)
        .where(
          and(
            eq(schema.reviews.userId, user_id),
            eq(schema.reviews.id, review_id),
          ),
        );
      if (result.rowCount === 0)
        throw new NotFoundException('Review Not Found or Invalid Credentials');

      return { result };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
