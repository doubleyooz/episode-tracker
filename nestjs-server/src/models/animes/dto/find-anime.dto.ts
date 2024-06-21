import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FindAnimeRequest {
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
    example: 1,
    description: 'The id of the user who is linked to the anime',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  userId: number;

  @Exclude()
  id: number;
}
