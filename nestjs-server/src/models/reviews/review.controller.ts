import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { User } from 'src/models/users/user.interface';
import { ReviewService } from './review.service';
import { CreateReviewRequest } from './dto/create-review.dto';
import { UpdateReviewRequest } from './dto/update-review.dto';
import { FindReviewRequest } from './dto/find-review.dto';

@UseInterceptors(ResponseInterceptor)
@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  @Post()
  @UseGuards(JwtAuthGuard)
  async createReview(
    @CurrentUser() user: User,
    @Body() request: CreateReviewRequest,
  ) {
    console.log({ controller: request });
    return this.reviewService.create(user.id, request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() filter: FindReviewRequest) {
    return this.reviewService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') _id: number) {
    return this.reviewService.findOneById(_id);
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
    }),
  )
  @Put()
  @UseGuards(JwtAuthGuard)
  async update(
    @CurrentUser() user: User,
    @Body() request: UpdateReviewRequest,
  ): Promise<object> {
    console.log('update');
    console.log(user);
    return this.reviewService.updateReviewById(user.id, request);
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
    }),
  )
  @Delete(':review_id/:anime_id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @CurrentUser() user: User,
    @Param('review_id') episodeId: number,
    @Param('anime_id') animeId: number,
  ): Promise<object> {
    return this.reviewService.deleteById(user.id, animeId, episodeId);
  }
}
