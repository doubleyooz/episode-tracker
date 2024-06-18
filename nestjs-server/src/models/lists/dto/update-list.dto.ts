import { Exclude } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { List } from '../list.interface';

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

  // Check at least one is provided
  @ValidateIf((o: List) => !o.description && !o.title)
  @IsDefined({
    message: "At least one of ['description', 'title'] must be provided",
  })
  protected readonly checkAtLeastOne: undefined;
}
