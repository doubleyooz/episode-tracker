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
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('reviews')
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
  @ApiOperation({ summary: 'Create a review.' })
  @ApiCreatedResponse({
    description: 'The review has been successfully created.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async createReview(
    @CurrentUser() user: User,
    @Body() request: CreateReviewRequest,
  ) {
    return this.reviewService.create(user.id, request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'description',
    required: false,
    description: 'Filter reviews by description.',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter reviews by userId.',
  })
  @ApiQuery({
    name: 'animeId',
    required: false,
    description: 'Filter reviews by animeId.',
  })
  @ApiOperation({ summary: 'Find all reviews.' })
  @ApiOkResponse({ description: 'Reviews found and returned.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  findAll(@Query() filter: FindReviewRequest) {
    return this.reviewService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'Review id',
    example: '1',
  })
  @ApiOperation({ summary: 'Find a review by ID.' })
  @ApiOkResponse({ description: 'Review found and returned.' })
  @ApiNotFoundResponse({ description: 'Review not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
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
  @ApiOperation({ summary: 'Update a review by ID.' })
  @ApiOkResponse({ description: 'Review updated and returned.' })
  @ApiNotFoundResponse({ description: 'Review not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @CurrentUser() user: User,
    @Body() request: UpdateReviewRequest,
  ): Promise<object> {
    return this.reviewService.updateReviewById(user.id, request);
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
    }),
  )
  @Delete(':review_id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'review_id',
    description: 'Review Id',
    example: '1',
  })
  @ApiOperation({
    summary: 'Delete a review by ID',
  })
  @ApiOkResponse({ description: 'Review found and deleted.' })
  @ApiNotFoundResponse({ description: 'Review not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async delete(
    @CurrentUser() user: User,
    @Param('review_id') review_id: number,
  ): Promise<object> {
    return this.reviewService.deleteById(user.id, review_id);
  }
}
