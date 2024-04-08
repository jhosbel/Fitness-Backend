import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Notification {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: true })
  read: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
