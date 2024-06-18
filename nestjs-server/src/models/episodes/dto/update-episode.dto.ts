import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { Episode } from '../episode.interface';

export class UpdateEpisodeRequest {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  stoppedAtHours: number;

  @IsOptional()
  @IsNumber()
  stoppedAtMinutes: number;

  @IsOptional()
  @IsNumber()
  stoppedAtSeconds: number;

  @IsOptional()
  @IsBoolean()
  finished: boolean;

  @IsNumber()
  @Min(0)
  id: number;

  @IsNumber()
  @Min(0)
  animeId: number;

  // Check at least one is provided
  @ValidateIf(
    (o: Episode) =>
      !o.finished &&
      !o.stoppedAtSeconds &&
      !o.stoppedAtHours &&
      !o.description &&
      !o.stoppedAtMinutes &&
      !o.title,
  )
  @IsDefined({
    message:
      "At least one of ['finished', 'stoppedAtSeconds', 'stoppedAtHours', 'description', 'stoppedAtMinutes', 'title'] must be provided",
  })
  protected readonly checkAtLeastOne: undefined;
}
