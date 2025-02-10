import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCalendarDataDto {
  /* @IsString()
  readonly id: string; */

  @IsString()
  readonly title: string;

  @IsString()
  readonly start: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  trainingListId: string;

  @IsString()
  @IsNotEmpty()
  userEmail: string;
}

export class CalendaDataListDto {
  data: CreateCalendarDataDto[];
}
