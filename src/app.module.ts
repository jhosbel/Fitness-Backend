import { Module } from '@nestjs/common';
import { ExerciseModule } from './exercise/exercise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainigModule } from './trainig/training.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/TrainingApp'),
    ExerciseModule,
    TrainigModule,
  ],
})
export class AppModule {}
