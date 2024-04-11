import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Friends, FriendsSchema } from './schema/friends.schema';
import { Users, UsersSchema } from 'src/users/schema/users.schema';
import { WebsocketGateway } from 'src/websockets/websocket.gateway';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Friends.name,
        schema: FriendsSchema,
      },
      {
        name: Users.name,
        schema: UsersSchema,
      },
    ]),
    NotificationModule,
  ],
  controllers: [FriendsController],
  providers: [FriendsService, WebsocketGateway],
  exports: [FriendsService],
})
export class FriendsModule {}
