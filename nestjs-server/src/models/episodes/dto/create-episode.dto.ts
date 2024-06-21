import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateEpisodeRequest {
  @ApiProperty({
    example: 'Freeza dies',
    description: 'The title of the episode',
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This episode is overrated',
    description: 'The description of the episode',
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 4,
    description: 'The number of hours in when the episode was paused',
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  stoppedAtHours: number = 0;

  @ApiProperty({
    example: 4,
    description: 'The number of minutes in when the episode was paused',
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  stoppedAtMinutes: number = 0;

  @ApiProperty({
    example: 34,
    description: 'The number of seconds in when the episode was paused',
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  stoppedAtSeconds: number = 0;

  @ApiProperty({
    example: false,
    description: 'If the episode is tagged has finished',
    required: false,
  })
  @IsOptional()
  finished: boolean = false;

  @ApiProperty({
    example: 4,
    description: 'The anime id which the episode belongs to',
  })
  @IsNumber()
  @Min(0)
  animeId: number;
}
