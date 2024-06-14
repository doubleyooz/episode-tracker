import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserRequest {
  @IsString()
  @IsNotEmpty()
  username: string;

  @Exclude()
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  tokenVersion: number;

  @Exclude()
  active: boolean;

  @Exclude()
  codeToValidate: string;

  @Exclude()
  codeExpiration: string;
}
