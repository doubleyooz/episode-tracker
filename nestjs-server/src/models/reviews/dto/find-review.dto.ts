import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FindReviewRequest {
  @ApiProperty({
    example: 'This Anime is horrible',
    description: 'The description of the review',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: 2,
    description: 'The id of the anime the review is about',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  animeId: number;

  @ApiProperty({
    example: 2,
    description: 'The id of the user who made the review',
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
