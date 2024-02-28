import { Module } from '@nestjs/common';
import { ExerciseModule } from './exercise/exercise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainigModule } from './trainig/training.module';
import { TrainingListModule } from './training-list/training-list.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/TrainingApp'),
    ExerciseModule,
    TrainigModule,
    TrainingListModule,
  ],
})
export class AppModule {}
