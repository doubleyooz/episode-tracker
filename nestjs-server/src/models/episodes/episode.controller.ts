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
import { EpisodeService } from './episode.service';
import { CreateEpisodeRequest } from './dto/create-episode.dto';
import { UpdateEpisodeRequest } from './dto/update-episode.dto';
import { FindEpisodeRequest } from './dto/find-episode.dto';
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

@ApiTags('episodes')
@UseInterceptors(ResponseInterceptor)
@Controller('episodes')
export class EpisodeController {
  constructor(private episodeService: EpisodeService) {}

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create an episode.' })
  @ApiCreatedResponse({
    description: 'The episode has been successfully created.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async createEpisode(
    @CurrentUser() user: User,
    @Body() request: CreateEpisodeRequest,
  ) {
    console.log({ controller: request });
    return this.episodeService.create(user.id, request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Filter episodes by title.',
  })
  @ApiQuery({
    name: 'description',
    required: false,
    description: 'Filter episodes by description.',
  })
  @ApiQuery({
    name: 'animeId',
    required: false,
    description: 'Filter episodes by animeId.',
  })
  @ApiOperation({ summary: 'Find all episodes.' })
  @ApiOkResponse({ description: 'Episodes found and returned.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  findAll(@Query() filter: FindEpisodeRequest) {
    return this.episodeService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'Episode id',
    example: '1',
  })
  @ApiOperation({ summary: 'Find a episode by ID.' })
  @ApiOkResponse({ description: 'Episode found and returned.' })
  @ApiNotFoundResponse({ description: 'Episode not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  findOne(@Param('id') _id: number) {
    return this.episodeService.findOneById(_id);
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
    }),
  )
  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update an episode by ID.' })
  @ApiOkResponse({ description: 'Episode updated and returned.' })
  @ApiNotFoundResponse({ description: 'Episode not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @CurrentUser() user: User,
    @Body() request: UpdateEpisodeRequest,
  ): Promise<object> {
    return this.episodeService.updateEpisodeById(user.id, request);
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
    }),
  )
  @Delete(':episode_id/:anime_id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'episode_id',
    description: 'Episode Id',
    example: '1',
  })
  @ApiParam({
    name: 'anime_id',
    description: 'Anime id',
    example: '1',
  })
  @ApiOperation({
    summary: 'Delete an episode by ID, you need to have its animeId too.',
  })
  @ApiOkResponse({ description: 'Episode found and deleted.' })
  @ApiNotFoundResponse({ description: 'Episode not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async delete(
    @CurrentUser() user: User,
    @Param('episode_id') episodeId: number,
    @Param('anime_id') animeId: number,
  ): Promise<object> {
    return this.episodeService.deleteById(user.id, animeId, episodeId);
  }
}
