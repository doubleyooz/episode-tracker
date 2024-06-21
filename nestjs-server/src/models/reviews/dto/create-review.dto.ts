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
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  animeId: number;

  @IsOptional()
  finished: boolean = false;

  @Exclude()
  userId: number;
}
