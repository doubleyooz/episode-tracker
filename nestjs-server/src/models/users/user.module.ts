import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DrizzleProvider } from '../../drizzle/drizzle.provider';
@Module({
  imports: [],
  providers: [UserService, ...DrizzleProvider],
  controllers: [UserController],
})
export class UserModule {}
