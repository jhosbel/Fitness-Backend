import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Training {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    type: [
      {
        id: {
          type: mongoose.Schema.ObjectId,
          ref: 'Exercises',
        },
        series: String,
        weightType: String,
        weight: Number,
        breakTime: Number,
        description: String,
      },
    ],
  })
  exercises: {
    id: string;
    series: number;
    weightType: string;
    weight: number;
    breakTime: number;
    description: string;
  };
}

export const TrainingSchema = SchemaFactory.createForClass(Training);
