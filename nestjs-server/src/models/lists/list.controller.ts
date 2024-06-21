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
import { ListService } from './list.service';
import { CreateListRequest } from './dto/create-list.dto';
import { UpdateListRequest } from './dto/update-list.dto';
import { FindListRequest } from './dto/find-list.dto';
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

@ApiTags('lists')
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
  @ApiOperation({ summary: 'Create a list.' })
  @ApiCreatedResponse({
    description: 'The anime has been successfully created.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async createList(
    @CurrentUser() user: User,
    @Body() request: CreateListRequest,
  ) {
    return this.listService.create(user.id, request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Filter lists by title.',
  })
  @ApiQuery({
    name: 'description',
    required: false,
    description: 'Filter lists by description.',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter lists by userId.',
  })
  @ApiOperation({ summary: 'Find all lists.' })
  @ApiOkResponse({ description: 'Lists found and returned.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  findAll(@Query() filter: FindListRequest) {
    return this.listService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'List id',
    example: '1',
  })
  @ApiOperation({ summary: 'Find a list by ID.' })
  @ApiOkResponse({ description: 'List found and returned.' })
  @ApiNotFoundResponse({ description: 'List not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
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
  @ApiOperation({ summary: 'Update a list by ID.' })
  @ApiOkResponse({ description: 'list updated and returned.' })
  @ApiNotFoundResponse({ description: 'list not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
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
  @ApiParam({
    name: 'id',
    description: 'List Id',
    example: '1',
  })
  @ApiOperation({ summary: 'Delete a list by ID.' })
  @ApiOkResponse({ description: 'List found and returned.' })
  @ApiNotFoundResponse({ description: 'List not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async delete(
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<object> {
    return this.listService.deleteById(user.id, id);
  }
}
