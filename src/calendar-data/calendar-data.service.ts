import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CalendarData } from './schema/calendar-data.schema';
import { Model } from 'mongoose';
import { CreateCalendarDataDto } from './dto/create-calendar-data.dto';
/* import { UpdateCalendarDataDto } from './dto/update-calendar-data.dto'; */

@Injectable()
export class CalendarDataService {
  constructor(
    @InjectModel(CalendarData.name)
    private calendarDataModel: Model<CalendarDataService>,
  ) {}

  async findAllCalendarData() {
    return this.calendarDataModel.find();
  }

  async findOneCalendarData(id: string) {
    return await this.calendarDataModel.findById(id);
  }
  async createCalendarData(createCalendarDataDto: CreateCalendarDataDto) {
    const newCalendarData = new this.calendarDataModel(createCalendarDataDto);
    return newCalendarData.save();
  }

  /* update(id: number, updateCalendarDatumDto: UpdateCalendarDatumDto) {
    return `This action updates a #${id} calendarDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} calendarDatum`;
  } */
}
