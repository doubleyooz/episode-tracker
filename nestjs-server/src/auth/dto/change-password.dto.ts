import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsString,
  Matches,
} from 'class-validator';

export class ChangePasswordRequest {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  code: string;

  @IsString()
  @IsDefined()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/)
  @IsNotEmpty()
  password: string;
}
