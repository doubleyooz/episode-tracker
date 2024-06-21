import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateAnimeRequest {
  @ApiProperty({
    example: 'Hajime no Ippo',
    description: 'The title of the anime',
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This anime is quite cool now that you mentioned it',
    description: 'The description of the anime',
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'Mad House',
    description: 'The studio the made the anime',
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  studio: string;

  @ApiProperty({
    example: false,
    description: 'If the anime is tagged has finished',
  })
  @Exclude()
  finished: boolean = false;

  @Exclude()
  userId: number;
}
