import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Users {
  @Prop({
    trim: true,
    index: false,
  })
  name: string;

  @Prop({
    trim: true,
  })
  email: string;

  @Prop({
    trim: true,
    index: false,
  })
  password: string;

  @Prop({
    index: false,
    default: 'user',
  })
  rol: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
