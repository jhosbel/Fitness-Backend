import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCalendarDataDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly start: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  userEmail: string;
}

export class CalendaDataListDto {
  data: CreateCalendarDataDto[];
}
