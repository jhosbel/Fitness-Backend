import { IsArray, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class ExerciseInTrainingDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly muscle: string;

  @IsString()
  readonly equipment: string;

  @IsNumber()
  readonly series: string;

  @IsString()
  readonly weightType: string;

  @IsNumber()
  readonly weight: string;

  @IsNumber()
  readonly breakTime: string;

  @IsString()
  readonly description: string;
}

export class CreateTrainigDto {
  @IsString()
  title: string;

  @IsArray()
  @Type(() => ExerciseInTrainingDto)
  exercises: ExerciseInTrainingDto[];
}
