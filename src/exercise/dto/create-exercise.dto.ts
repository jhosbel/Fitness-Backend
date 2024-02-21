import { IsString, IsOptional } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  muscle?: string;

  @IsString()
  @IsOptional()
  equipment?: string;

  @IsString()
  @IsOptional()
  instructions?: string;
}
