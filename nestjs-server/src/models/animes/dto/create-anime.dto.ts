import { Exclude } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateAnimeRequest {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  studio: string;

  @Exclude()
  finished: boolean = false;

  @Exclude()
  userId: number;
}
