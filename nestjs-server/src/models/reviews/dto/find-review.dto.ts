import { Exclude, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FindReviewRequest {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  animeId: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  userId: number;

  @Exclude()
  id: number;
}
