import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { DrizzleProvider } from '../../drizzle/drizzle.provider';
@Module({
  imports: [],
  providers: [ReviewService, ...DrizzleProvider],
  controllers: [ReviewController],
})
export class ReviewModule {}
