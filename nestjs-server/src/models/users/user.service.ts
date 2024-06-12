import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as bcrypt from 'bcrypt';

import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider';
import * as schema from '../../drizzle/schema';
import { CreateUserRequest } from './dto/create-user.dto';
import { IResponseBody } from 'src/common/interceptors/response.interceptor';

@Injectable()
export class UserService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly drizzle: NodePgDatabase<typeof schema>,
    private readonly configService: ConfigService,
  ) {}

  async create(user: CreateUserRequest): Promise<IResponseBody> {
    try {
      await this.drizzle.insert(schema.users).values({
        email: user.email,
        username: user.username,
        password: await bcrypt.hash(
          user.password,
          this.configService.get<number>('HASH_SALT'),
        ),
      });

      return { result: { email: user.email, username: user.username } };
    } catch (err) {
      throw new BadRequestException(
        err.code === '23505' ? 'Email already in use.' : err,
      );
    }
  }

  async findAll() {
    const result = await this.drizzle
      .select({
        id: schema.users.id,
        email: schema.users.email,
        username: schema.users.username,
      })
      .from(schema.users);
    return { result: result };
  }

  async findOneById(_id: number) {
    const result = await this.drizzle
      .select({
        id: schema.users.id,
        email: schema.users.email,
        username: schema.users.username,
      })
      .from(schema.users)
      .where(eq(schema.users.id, _id));
    if (result.length === 0) throw new NotFoundException('User not found');
    return { result: result };
  }

  async findOneByEmail(_email: string) {
    const result = await this.drizzle
      .select({
        id: schema.users.id,
        email: schema.users.email,
        username: schema.users.username,
      })
      .from(schema.users)
      .where(eq(schema.users.email, _email));
    if (result.length === 0) throw new NotFoundException('User not found');
    return { result: result };
  }

  async deleteById(_id: number) {
    await this.drizzle.delete(schema.users).where(eq(schema.users.id, _id));

    return { result: { id: _id } };
  }

  async validateUser(_email: string, _password: string) {
    const user = await this.drizzle.query.users.findFirst({
      where: eq(schema.users.email, _email),
    });
    const isValidPassword = await bcrypt.compare(_password, user.password);
    if (!isValidPassword)
      throw new UnauthorizedException('Credentials are not valid');
    delete user.password;

    return user;
  }
}
