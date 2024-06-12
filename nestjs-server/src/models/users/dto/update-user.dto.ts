import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserRequest {
  @IsString()
  @IsNotEmpty()
  username: string;
}
