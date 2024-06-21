import { Exclude, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FindAnimeRequest {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  userId: number;

  @Exclude()
  id: number;
}
