import { IsString, IsUUID } from 'class-validator';

export class CreateUserConfigDto {
  @IsString()
  age: string;
  @IsString()
  height: string;
  @IsString()
  weight: string;
  @IsUUID()
  userId: string;
}
