import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { WebsocketGateway } from 'src/websockets/websocket.gateway';
import { NotificationModule } from 'src/notification/notification.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friends } from './entity/friends.entity';
import { Users } from 'src/users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Friends, Users]), NotificationModule],
  controllers: [FriendsController],
  providers: [FriendsService, WebsocketGateway],
  exports: [FriendsService],
})
export class FriendsModule {}
