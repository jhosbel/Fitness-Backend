import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, IsOptional } from 'class-validator';

class ExerciseInTrainingDto {
  @IsNumber()
  @IsOptional()
  readonly series: string;

  @IsString()
  @IsOptional()
  readonly weightType: string;

  @IsNumber()
  @IsOptional()
  readonly weight: string;

  @IsNumber()
  @IsOptional()
  readonly breakTime: string;

  @IsString()
  @IsOptional()
  readonly note: string;
}
export class UpdateTrainigDto {
  /* @IsString()
  @IsOptional()
  title: string; */

  @IsArray()
  @Type(() => ExerciseInTrainingDto)
  exercises: ExerciseInTrainingDto[];
}
