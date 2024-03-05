import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const CalendarDataSchema = SchemaFactory.createForClass(CalendarData);
