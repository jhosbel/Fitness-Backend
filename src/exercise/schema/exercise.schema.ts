import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Exercise {
  @Prop({
    trim: true,
    unique: false,
    index: false,
  })
  name: string;

  @Prop({
    trim: true,
    unique: false,
    index: false,
  })
  muscle: string;

  @Prop({
    trim: true,
    unique: false,
    index: false,
  })
  equipment: string;

  @Prop({
    trim: true,
    unique: false,
    index: false,
  })
  instructions: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
