import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  async createAnime(
    @CurrentUser() user: User,
    @Body() request: CreateAnimeRequest,
  ) {
    return this.animeService.create(user.id, request);
  }

  @Get()
  findAll() {
    return this.animeService.findAll();
  }

  @Get(':id')
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
  async delete(
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<object> {
    return this.animeService.deleteById(user.id, id);
  }
}
