import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { Anime } from '../anime.interface';

export class UpdateAnimeRequest {
  @ValidateIf(
    (o) =>
      !o.description || !o.studio || (o as Anime).hasOwnProperty('finished'),
  )
  @IsOptional()
  @IsString()
  title: string;

  @ValidateIf(
    (o) => !o.title || !o.studio || (o as Anime).hasOwnProperty('finished'),
  )
  @IsOptional()
  @IsString()
  description: string;

  @ValidateIf(
    (o) =>
      !o.title || !o.description || (o as Anime).hasOwnProperty('finished'),
  )
  @IsOptional()
  @IsString()
  studio: string;

  @ValidateIf((o) => !o.title || !o.description || !o.studio)
  @IsOptional()
  @IsBoolean()
  finished: boolean;

  @IsNumber()
  @Min(0)
  id: number;

  @Exclude()
  userId: number;
}
