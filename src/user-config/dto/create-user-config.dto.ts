import { IsString } from 'class-validator';

export class CreateUserConfigDto {
  @IsString()
  age: string;
  @IsString()
  height: string;
  @IsString()
  weight: string;
  @IsString()
  userId: string;
}
