import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class UserConfig {
  @Prop({
    trim: true,
  })
  age: string;
  @Prop({
    trim: true,
  })
  height: string;
  @Prop({
    trim: true,
  })
  weight: string;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  })
  userId: string;
}

export const UserConfigSchema = SchemaFactory.createForClass(UserConfig);
