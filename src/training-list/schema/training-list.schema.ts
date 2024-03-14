import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
/* import { Users } from 'src/users/schema/users.schema'; */

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
        reps: { type: Number, required: true },
        weightType: { type: String },
        weight: { type: Number },
        breakTime: { type: Number },
        breakTimeType: { type: String },
        note: { type: String },
      },
    ],
  })
  exercises: Record<string, any[]>;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  })
  userId: string;

  @Prop()
  userEmail: string;
}

export const TrainingListSchema = SchemaFactory.createForClass(TrainingList);
