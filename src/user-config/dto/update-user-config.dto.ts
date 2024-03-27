import { PartialType } from '@nestjs/swagger';
import { CreateUserConfigDto } from './create-user-config.dto';
import { IsString } from 'class-validator';

export class UpdateUserConfigDto extends PartialType(CreateUserConfigDto) {
  @IsString()
  age: string;
  @IsString()
  height: string;
  @IsString()
  weight: string;
}
