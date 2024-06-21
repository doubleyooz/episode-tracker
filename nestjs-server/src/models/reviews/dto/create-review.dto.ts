import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateReviewRequest {
  @ApiProperty({
    example: 'This Anime is horrible',
    description: 'The description of the review',
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 2,
    description: 'The id of the anime the review is about',
  })
  @IsNumber()
  @Min(0)
  animeId: number;

  @ApiProperty({
    example: false,
    description: 'If the anime is tagged has finished',
    required: false,
  })
  @IsOptional()
  finished: boolean = false;

  @Exclude()
  userId: number;
}
