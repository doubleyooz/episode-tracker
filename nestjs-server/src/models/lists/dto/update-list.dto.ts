import { Exclude } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class UpdateListRequest {
  @ValidateIf((o) => !o.description)
  @IsOptional()
  @IsString()
  title: string;

  @ValidateIf((o) => !o.title)
  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  id: number;

  @Exclude()
  userId: number;
}
