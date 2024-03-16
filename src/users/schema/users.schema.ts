import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../../common/enums/rol.enum';
import { TrainingList } from 'src/training-list/schema/training-list.schema';
import mongoose from 'mongoose';
import { CalendarData } from 'src/calendar-data/schema/calendar-data.schema';

@Schema({
  timestamps: true,
})
export class Users {
  @Prop({
    trim: true,
    index: false,
  })
  name: string;

  @Prop({
    trim: true,
    unique: true,
  })
  email: string;

  @Prop({
    trim: true,
    index: false,
    /* select: false, */
  })
  password: string;

  @Prop({
    index: false,
    default: Role.USER,
    enum: Role,
  })
  role: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrainingList' }],
  })
  trainingList: TrainingList[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CalendarData' }],
  })
  calendarData: CalendarData[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
