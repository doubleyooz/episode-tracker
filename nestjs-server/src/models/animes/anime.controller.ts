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
import { AnimeService } from './anime.service';
import { CreateAnimeRequest } from './dto/create-anime.dto';
import { UpdateAnimeRequest } from './dto/update-anime.dto';
import { FindAnimeRequest } from './dto/find-anime.dto';
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

@ApiTags('animes')
@UseInterceptors(ResponseInterceptor)
@Controller('animes')
export class AnimeController {
  constructor(private animeService: AnimeService) {}

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create an anime.' })
  @ApiCreatedResponse({
    description: 'The anime has been successfully created.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async createAnime(
    @CurrentUser() user: User,
    @Body() request: CreateAnimeRequest,
  ) {
    return this.animeService.create(user.id, request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Filter animes by title.',
  })
  @ApiQuery({
    name: 'description',
    required: false,
    description: 'Filter animes by description.',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter animes by userId.',
  })
  @ApiOperation({ summary: 'Find all animes.' })
  @ApiOkResponse({ description: 'Animes found and returned.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  findAll(@Query() filter: FindAnimeRequest) {
    return this.animeService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'Anime Id',
    example: '1',
  })
  @ApiOperation({ summary: 'Find an anime by ID.' })
  @ApiOkResponse({ description: 'Anime found and returned.' })
  @ApiNotFoundResponse({ description: 'Anime not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  findOne(@Param('id') _id: number) {
    return this.animeService.findOneById(_id);
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
    }),
  )
  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update an anime by ID.' })
  @ApiOkResponse({ description: 'Anime updated and returned.' })
  @ApiNotFoundResponse({ description: 'Anime not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @CurrentUser() user: User,
    @Body() request: UpdateAnimeRequest,
  ): Promise<object> {
    console.log('update');
    console.log(user);
    return this.animeService.updateAnimeById(user.id, request);
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
    }),
  )
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'Anime Id',
    example: '1',
  })
  @ApiOperation({ summary: 'Delete an anime by ID.' })
  @ApiOkResponse({ description: 'Anime found and returned.' })
  @ApiNotFoundResponse({ description: 'Anime not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async delete(
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<object> {
    return this.animeService.deleteById(user.id, id);
  }
}
