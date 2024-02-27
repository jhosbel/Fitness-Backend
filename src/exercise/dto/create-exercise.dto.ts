import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  muscle?: string;

  @IsString()
  @IsNotEmpty()
  equipment?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  instructions?: string;

  @IsString()
  @IsNotEmpty()
  image?: string;
}
