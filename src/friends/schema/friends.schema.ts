import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Status } from 'src/common/enums/status.enum';

@Schema({
  timestamps: true,
})
export class Friends {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  })
  senderId: string;
  @Prop({
    type: [{ type: String, ref: 'Users.name' }],
  })
  senderName: string;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  })
  recipientId: string;
  @Prop({
    type: [
      { type: String, enum: Object.values(Status), default: Status.PENDING },
    ],
  })
  status: Status;
}

export const FriendsSchema = SchemaFactory.createForClass(Friends);
