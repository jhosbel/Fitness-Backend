import { IsString, IsOptional } from 'class-validator';

export class UpdateExerciseDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  muscle: string;

  @IsString()
  @IsOptional()
  equipment: string;

  @IsString()
  @IsOptional()
  instructions: string;
}
