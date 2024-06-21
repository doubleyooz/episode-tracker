import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { Review } from '../review.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewRequest {
  @ApiProperty({
    example: 'This Anime is horrible',
    description: 'The description of the review',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: false,
    description: 'If the anime is tagged has finished',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  finished: boolean;

  @ApiProperty({
    example: 2,
    description: 'The id of the review',
  })
  @IsNumber()
  @Min(0)
  id: number;

  // Check at least one is provided
  @ValidateIf((o: Review) => !o.finished && !o.description)
  @IsDefined({
    message: "At least one of ['finished', 'description'] must be provided",
  })
  protected readonly checkAtLeastOne: undefined;
}
