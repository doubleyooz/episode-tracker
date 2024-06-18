import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateEpisodeRequest {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  stoppedAtHours: number = 0;

  @IsNumber()
  @IsOptional()
  @Min(0)
  stoppedAtMinutes: number = 0;

  @IsNumber()
  @IsOptional()
  @Min(0)
  stoppedAtSeconds: number = 0;

  @IsOptional()
  finished: boolean = false;

  @IsNumber()
  @Min(0)
  animeId: number;
}
