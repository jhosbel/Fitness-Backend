import {
  Param,
  Controller,
  Get,
  Post,
  Body /* , Patch, Delete */,
  NotFoundException,
} from '@nestjs/common';
import { CalendarDataService } from './calendar-data.service';
import { CreateCalendarDataDto } from './dto/create-calendar-data.dto';
/* import { UpdateCalendarDataDto } from './dto/update-calendar-data.dto'; */

@Controller('calendar-data')
export class CalendarDataController {
  constructor(private readonly calendarDataService: CalendarDataService) {}

  @Get()
  async findAllCalendarData() {
    return this.calendarDataService.findAllCalendarData();
  }

  @Get(':id')
  async findOneCalendarData(@Param('id') id: string) {
    if (!id) throw new NotFoundException('ID del ejercicio no proporcionada');
    const calendar = await this.calendarDataService.findOneCalendarData(id);
    if (!calendar) throw new NotFoundException('Ejercicio no encontrado');
    return calendar;
  }

  @Post()
  createCalendarData(@Body() body: CreateCalendarDataDto) {
    return this.calendarDataService.createCalendarData(body);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateCalendarDatumDto: UpdateCalendarDatumDto) {
    return this.calendarDataService.update(+id, updateCalendarDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendarDataService.remove(+id);
  } */
}
