import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import { FindUserRequest } from './dto/find-user.dto';

@ApiTags('users')
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
  @ApiOperation({ summary: 'Create a user.' })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async createUser(@Body() request: CreateUserRequest) {
    return this.userService.create(request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'username',
    required: false,
    description: 'Filter users by username.',
  })
  @ApiOperation({ summary: 'Find all users.' })
  @ApiOkResponse({ description: 'Users found and returned.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  findAll(@Query() filter: FindUserRequest) {
    return this.userService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'User id',
    example: '1',
  })
  @ApiOperation({ summary: 'Find a user by ID.' })
  @ApiOkResponse({ description: 'User found and returned.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
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
  @ApiOperation({ summary: 'Update a user by ID.' })
  @ApiOkResponse({ description: 'User updated and returned.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
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
  @ApiParam({
    name: 'id',
    description: 'User Id',
    example: '1',
  })
  @ApiOperation({
    summary: 'Delete a user by ID',
    description: 'it must match the id in the auth token',
  })
  @ApiOkResponse({ description: 'User found and deleted.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async delete(
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<object> {
    if (user.id !== id) throw new UnauthorizedException('Invalid credentials');
    return this.userService.deleteById(id);
  }
}
