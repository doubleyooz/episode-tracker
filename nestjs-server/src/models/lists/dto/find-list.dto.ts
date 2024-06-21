import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FindListRequest {
  @ApiProperty({
    example: 'My List',
    description: 'The title of the list',
    required: false,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'This list contains horrible animes',
    description: 'The description of the list',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: 2,
    description: 'The id of the user who created the list',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  userId: number;

  @Exclude()
  id: number;
}
