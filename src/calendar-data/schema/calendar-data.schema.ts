import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class CalendarData {
  @Prop({
    trim: true,
    index: false,
  })
  id: string;

  @Prop({
    trim: true,
    index: false,
  })
  title: string;

  @Prop({
    trim: true,
    index: false,
  })
  start: string;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  })
  userId: string;

  @Prop()
  userEmail: string;
}

export const CalendarDataSchema = SchemaFactory.createForClass(CalendarData);
