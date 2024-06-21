import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FindEpisodeRequest {
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
    description: 'The anime id which the episode belongs to',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  animeId: number;

  @Exclude()
  id: number;
}
