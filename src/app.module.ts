import { Module } from '@nestjs/common';
import { ExerciseModule } from './exercise/exercise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainigModule } from './trainig/training.module';
import { TrainingListModule } from './training-list/training-list.module';
import { CalendarDataModule } from './calendar-data/calendar-data.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION),
    ExerciseModule,
    TrainigModule,
    TrainingListModule,
    CalendarDataModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
