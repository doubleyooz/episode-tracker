import { Exclude } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserRequest {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  username: string;

  @Exclude()
  tokenVersion: number;

  @Exclude()
  active: boolean;
}
