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
import { ListService } from './list.service';
import { CreateListRequest } from './dto/create-list.dto';
import { UpdateListRequest } from './dto/update-list.dto';

@UseInterceptors(ResponseInterceptor)
@Controller('lists')
export class ListController {
  constructor(private listService: ListService) {}

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  @Post()
  @UseGuards(JwtAuthGuard)
  async createAnime(
    @CurrentUser() user: User,
    @Body() request: CreateListRequest,
  ) {
    return this.listService.create(user.id, request);
  }

  @Get()
  findAll() {
    return this.listService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') _id: number) {
    return this.listService.findOneById(_id);
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
    @Body() request: UpdateListRequest,
  ): Promise<object> {
    console.log('update');
    console.log(user);
    return this.listService.updateListById(user.id, request);
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
    return this.listService.deleteById(user.id, id);
  }
}
