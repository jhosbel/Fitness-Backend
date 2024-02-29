import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Training {
  @Prop([
    {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Exercises',
      },
      name: String,
      muscle: String,
      equipment: String,
      series: String,
      reps: Number,
      weightType: String,
      weight: Number,
      breakTime: Number,
      breakTimeType: String,
      note: String,
    },
  ])
  exercises: {
    id: string;
    name: string;
    muscle: string;
    equipment: string;
    series: number;
    reps: number;
    weightType: string;
    weight: number;
    breakTime: number;
    breakTimeType: string;
    note: string;
  }[];
}

export const TrainingSchema = SchemaFactory.createForClass(Training);
