import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
/* import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/users.schema'; */
//import { UserConfigModule } from 'src/user-config/user-config.module';
import { FriendsModule } from 'src/friends/friends.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { UserConfig } from 'src/user-config/entity/user-config.entity';

@Module({
  imports: [FriendsModule, TypeOrmModule.forFeature([Users, UserConfig])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
