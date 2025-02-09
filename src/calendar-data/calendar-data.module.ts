import { Module } from '@nestjs/common';
import { CalendarDataService } from './calendar-data.service';
import { CalendarDataController } from './calendar-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarData } from './entity/calendar-data.entity';
import { Users } from 'src/users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarData, Users])],
  controllers: [CalendarDataController],
  providers: [CalendarDataService],
})
export class CalendarDataModule {}
