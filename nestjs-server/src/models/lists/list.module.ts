import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { DrizzleProvider } from '../../drizzle/drizzle.provider';
@Module({
  imports: [],
  providers: [ListService, ...DrizzleProvider],
  controllers: [ListController],
})
export class ListModule {}
