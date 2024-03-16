import { Module } from '@nestjs/common';
import { CalendarDataService } from './calendar-data.service';
import { CalendarDataController } from './calendar-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CalendarData,
  CalendarDataSchema,
} from './schema/calendar-data.schema';
import { Users, UsersSchema } from 'src/users/schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CalendarData.name,
        schema: CalendarDataSchema,
      },
      {
        name: Users.name,
        schema: UsersSchema,
      },
    ]),
  ],
  controllers: [CalendarDataController],
  providers: [CalendarDataService],
})
export class CalendarDataModule {}
