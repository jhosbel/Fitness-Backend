import { IsNumber, IsString } from 'class-validator';

class ExerciseDataListDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  muscle: string;

  @IsString()
  equipment: string;

  @IsString()
  image: string;

  @IsNumber()
  series: number;

  @IsNumber()
  reps: number;

  @IsString()
  weightType: string;

  @IsNumber()
  weight: string;

  @IsNumber()
  breakTime: string;

  @IsString()
  breakTimeType: string;

  @IsString()
  note: string;
}
export class UpdateTrainingListDto {
  @IsString()
  title: string;

  exercises: ExerciseDataListDto[];
}
