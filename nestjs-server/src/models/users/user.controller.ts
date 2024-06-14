import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserRequest } from './dto/create-user.dto';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { User } from './user.interface';
import { UpdateUserRequest } from './dto/update-user.dto';

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
  @Put()
  @UseGuards(JwtAuthGuard)
  async update(
    @CurrentUser() user: User,
    @Body() request: UpdateUserRequest,
  ): Promise<object> {
    console.log('update');
    console.log(user);
    return this.userService.updateUserById(user.id, request);
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
    if (user.id !== id) throw new UnauthorizedException('Invalid credentials');
    return this.userService.deleteById(id);
  }
}
