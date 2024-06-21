import { Exclude } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { List } from '../list.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateListRequest {
  @ApiProperty({
    example: 'My list',
    description: 'The title of the list',
    required: false,
  })
  @ValidateIf((o) => !o.description)
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'This list contains horrible animes',
    description: 'The description of the list',
    required: false,
  })
  @ValidateIf((o) => !o.title)
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: 12,
    description: 'The list id',
  })
  @IsNumber()
  @Min(0)
  id: number;

  @Exclude()
  userId: number;

  // Check at least one is provided
  @ValidateIf((o: List) => !o.description && !o.title)
  @IsDefined({
    message: "At least one of ['description', 'title'] must be provided",
  })
  protected readonly checkAtLeastOne: undefined;
}
