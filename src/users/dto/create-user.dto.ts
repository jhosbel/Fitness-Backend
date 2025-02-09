import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/common/enums/rol.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  name?: string;
  /* @IsString()
  @IsNotEmpty() */
  @IsEnum(Role)
  role: Role;
}
