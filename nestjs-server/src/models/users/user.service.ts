import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
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

  async generateRecoveryCode(_email: string) {
    const newCode = (Math.random() * 10)
      .toString()
      .substring(0, 7)
      .replace('.', '');
    const currentDate = new Date(); // gets the current date and time
    currentDate.setHours(currentDate.getHours() + 1); // adds one hour

    const result = await this.drizzle
      .update(schema.users)
      .set({
        codeToValidate: newCode,
        codeExpiration: currentDate.toISOString(),
      })
      .where(eq(schema.users.email, _email))
      .returning({ verifyCode: schema.users.codeToValidate });
    if (result.length === 0) throw new NotFoundException('User not found');
    return { result: result };
  }

  async verifyRecoveryCode(_email: string, _code: string) {
    const result = await this.drizzle
      .select({
        id: schema.users.id,
        email: schema.users.email,
        username: schema.users.username,
        codeExpiration: schema.users.codeExpiration,
      })
      .from(schema.users)
      .where(
        and(
          eq(schema.users.email, _email),
          eq(schema.users.codeToValidate, _code),
        ),
      );

    if (result.length === 0)
      throw new UnauthorizedException('Invalid credentials');
    return { result };
  }

  async updatePassword(_email: string, _newPassword: string) {
    const result = await this.drizzle
      .update(schema.users)
      .set({
        password: await bcrypt.hash(
          _newPassword,
          this.configService.get<number>('HASH_SALT'),
        ),
        codeToValidate: null,
        codeExpiration: null,
      })
      .where(and(eq(schema.users.email, _email), eq(schema.users.active, true)))
      .returning({ email: schema.users.email });
    if (result.length === 0)
      throw new UnauthorizedException('Invalid credentials');
    return { result };
  }

  async activateAccount(_email: string) {
    const result = await this.drizzle
      .update(schema.users)
      .set({
        active: true,
      })
      .where(
        and(eq(schema.users.email, _email), eq(schema.users.active, false)),
      )
      .returning({ email: schema.users.email, active: schema.users.active });

    console.log(result);
    return { result };
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
