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

export class UpdateReviewRequest {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  finished: boolean;

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
