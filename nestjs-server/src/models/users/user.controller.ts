import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserRequest } from './dto/create-user.dto';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';

@UseInterceptors(ResponseInterceptor)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  async createUser(@Body() request: CreateUserRequest) {
    return this.userService.create(request);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') _id: number) {
    return this.userService.findOneById(_id);
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
    }),
  )
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<object> {
    return this.userService.deleteById(id);
  }
}
