import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class FindUserRequest {
  @ApiProperty({
    example: 'John',
    description: 'A username of a user',
    required: false,
  })
  @IsOptional()
  @IsString()
  username: string;

  @Exclude()
  id: number;
}
