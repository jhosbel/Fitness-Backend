import { PartialType } from '@nestjs/swagger';
import { CreateCalendarDataDto } from './create-calendar-data.dto';

export class UpdateCalendarDatumDto extends PartialType(CreateCalendarDataDto) {}
