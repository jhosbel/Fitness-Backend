import { Module } from '@nestjs/common';
import { ExerciseModule } from './exercise/exercise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainigModule } from './trainig/training.module';
import { TrainingListModule } from './training-list/training-list.module';
import { CalendarDataModule } from './calendar-data/calendar-data.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserConfigModule } from './user-config/user-config.module';
import { FriendsModule } from './friends/friends.module';
import { NotificationModule } from './notification/notification.module';
import { GatewayModule } from './websockets/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER}.srnxyu2.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    ExerciseModule,
    TrainigModule,
    TrainingListModule,
    CalendarDataModule,
    UsersModule,
    AuthModule,
    UserConfigModule,
    FriendsModule,
    NotificationModule,
    GatewayModule,
  ],
})
export class AppModule {}
