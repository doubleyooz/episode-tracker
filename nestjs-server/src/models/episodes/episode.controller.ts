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
  async createEpisode(
    @CurrentUser() user: User,
    @Body() request: CreateEpisodeRequest,
  ) {
    console.log({ controller: request });
    return this.episodeService.create(user.id, request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() filter: FindEpisodeRequest) {
    return this.episodeService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
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
  async update(
    @CurrentUser() user: User,
    @Body() request: UpdateEpisodeRequest,
  ): Promise<object> {
    console.log('update');
    console.log(user);
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
  async delete(
    @CurrentUser() user: User,
    @Param('episode_id') episodeId: number,
    @Param('anime_id') animeId: number,
  ): Promise<object> {
    return this.episodeService.deleteById(user.id, animeId, episodeId);
  }
}
