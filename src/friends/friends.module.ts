import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Friends, FriendsSchema } from './schema/friends.schema';
import { Users, UsersSchema } from 'src/users/schema/users.schema';

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
  ],
  controllers: [FriendsController],
  providers: [FriendsService],
  exports: [FriendsService],
})
export class FriendsModule {}
