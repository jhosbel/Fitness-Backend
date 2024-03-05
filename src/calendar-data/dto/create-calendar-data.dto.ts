import { IsString } from 'class-validator';

export class CreateCalendarDataDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly start: string;
}

export class CalendaDataListDto {
  data: CreateCalendarDataDto[];
}
