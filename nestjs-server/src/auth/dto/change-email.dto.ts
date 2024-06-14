import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsString,
} from 'class-validator';

export class ChangeEmailRequest {
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

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  newEmail: string;
}
