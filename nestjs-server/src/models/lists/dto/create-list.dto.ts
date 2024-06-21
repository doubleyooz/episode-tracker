import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateListRequest {
  @ApiProperty({
    example: 'My list',
    description: 'The title of the list',
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This list contains horrible animes',
    description: 'The description of the list',
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description: string;

  @Exclude()
  userId: number;
}
