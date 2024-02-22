import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Exercise {
  @Prop({
    trim: true,
    index: false,
  })
  name: string;

  @Prop({
    trim: true,
    index: false,
  })
  muscle: string;

  @Prop({
    trim: true,
    index: false,
  })
  equipment: string;

  @Prop({
    trim: true,
    index: false,
  })
  instructions: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
