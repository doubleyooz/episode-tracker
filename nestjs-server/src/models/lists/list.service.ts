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
import { CreateListRequest } from './dto/create-list.dto';
import { UpdateListRequest } from './dto/update-list.dto';

@Injectable()
export class ListService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly drizzle: NodePgDatabase<typeof schema>,
    private readonly configService: ConfigService,
  ) {}

  async create(id: number, list: CreateListRequest): Promise<IResponseBody> {
    try {
      await this.drizzle.insert(schema.lists).values({
        title: list.title,
        description: list.description,

        userId: id,
      });

      return { result: { title: list.title, description: list.description } };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async updateListById(user_id: number, list: UpdateListRequest) {
    const result = await this.drizzle
      .update(schema.lists)
      .set({
        ...list,
      })
      .where(
        and(eq(schema.lists.userId, user_id), eq(schema.lists.id, list.id)),
      )
      .returning({
        title: schema.lists.title,
        description: schema.lists.description,
      });

    if (result.length === 0)
      throw new NotFoundException('List Not Found or Invalid Credentials');
    return { result };
  }

  async findAll() {
    const result = await this.drizzle
      .select({
        id: schema.lists.id,
        title: schema.lists.title,
        description: schema.lists.description,
      })
      .from(schema.lists);
    return { result: result };
  }

  async findOneById(_id: number) {
    const result = await this.drizzle
      .select({
        id: schema.lists.id,
        title: schema.lists.title,
        description: schema.lists.description,
      })
      .from(schema.lists)
      .where(eq(schema.lists.id, _id));
    if (result.length === 0) throw new NotFoundException('List not found');
    return { result: result };
  }

  async deleteById(user_id: number, anime_id: number): Promise<any> {
    const result = await this.drizzle
      .delete(schema.lists)
      .where(
        and(eq(schema.lists.userId, user_id), eq(schema.lists.id, anime_id)),
      );
    if (result.rowCount === 0)
      throw new NotFoundException('List Not Found or Invalid Credentials');

    return { result };
  }
}
