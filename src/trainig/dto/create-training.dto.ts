import { IsString, IsNumber } from 'class-validator';

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
  readonly series: number;

  @IsNumber()
  readonly reps: number;

  @IsString()
  readonly weightType: string;

  @IsNumber()
  readonly weight: string;

  @IsNumber()
  readonly breakTime: string;

  @IsString()
  readonly breakTimeType: string;

  @IsString()
  readonly note: string;
}

export class CreateTrainigDto {
  exercises: ExerciseInTrainingDto[];
}
