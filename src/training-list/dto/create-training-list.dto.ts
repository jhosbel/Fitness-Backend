import { IsString, IsNumber } from 'class-validator';

class ExerciseDataListDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly muscle: string;

  @IsString()
  readonly equipment: string;

  @IsString()
  readonly image: string;

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

export class CreateTrainingListDto {
  @IsString()
  title: string;

  exercises: ExerciseDataListDto[];
}
