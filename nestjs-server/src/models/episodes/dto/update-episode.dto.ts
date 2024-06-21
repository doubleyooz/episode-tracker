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
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEpisodeRequest {
  @ApiProperty({
    example: 'Hajime no Ippo',
    description: 'The title of the episode',
    required: false,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'This episode is overrated',
    description: 'The description of the episode',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: 4,
    description: 'The number of hours in when the episode was paused',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  stoppedAtHours: number;

  @ApiProperty({
    example: 4,
    description: 'The number of minutes in when the episode was paused',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  stoppedAtMinutes: number;

  @ApiProperty({
    example: 34,
    description: 'The number of seconds in when the episode was paused',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  stoppedAtSeconds: number;

  @ApiProperty({
    example: false,
    description: 'If the episode is tagged has finished',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  finished: boolean;

  @ApiProperty({
    example: 1,
    description: 'The episode id',
  })
  @IsNumber()
  @Min(0)
  id: number;

  @ApiProperty({
    example: 4,
    description: 'The anime id which the episode belongs to',
  })
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
