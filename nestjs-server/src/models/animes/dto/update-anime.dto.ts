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
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnimeRequest {
  @ApiProperty({
    example: 'Hajime no Ippo',
    description: 'The title of the anime',
    required: false,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'This anime is quite cool now that you mentioned it',
    description: 'The description of the anime',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Mad House',
    description: 'The studio the made the anime',
    required: false,
  })
  @IsOptional()
  @IsString()
  studio: string;

  @ApiProperty({
    example: false,
    description: 'If the anime is tagged has finished',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  finished: boolean;

  @ApiProperty({
    example: 1,
    description: 'The id of the user who is linked to the anime',
  })
  @IsOptional()
  @Min(0)
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
