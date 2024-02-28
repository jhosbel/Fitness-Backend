import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class TrainingList {
  @Prop({
    trim: true,
    index: false,
    required: true,
  })
  title: string;

  @Prop({
    type: [
      {
        id: { type: String },
        name: { type: String },
        muscle: { type: String },
        equipment: { type: String },
        image: { type: String },
        series: { type: Number },
        weightType: { type: String },
        weight: { type: Number },
        breakTime: { type: Number },
        breakTimeType: { type: String },
        note: { type: String },
      },
    ],
  })
  exercises: Record<string, any[]>;
}

export const TrainingListSchema = SchemaFactory.createForClass(TrainingList);
