import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Exercise {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  name: string;
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  muscle: string;
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  equipment: string;
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  instructions: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
