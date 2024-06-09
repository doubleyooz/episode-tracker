import { Inject, Injectable } from '@nestjs/common';

import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider';
import * as schema from '../../drizzle/schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly drizzle: NodePgDatabase<typeof schema>,
  ) {}

  async findAll() {
    return await this.drizzle.query.users.findMany();
  }
}
