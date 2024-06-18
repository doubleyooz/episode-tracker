import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { Anime } from '../anime.interface';

export class UpdateAnimeRequest {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  studio: string;

  @IsOptional()
  @IsBoolean()
  finished: boolean;

  @IsNumber()
  @Min(0)
  id: number;

  @Exclude()
  userId: number;

  // Check at least one is provided
  @ValidateIf(
    (o: Anime) => !o.finished && !o.description && !o.studio && !o.title,
  )
  @IsDefined({
    message:
      "At least one of ['finished', 'description', 'studio', 'title'] must be provided",
  })
  protected readonly checkAtLeastOne: undefined;
}
