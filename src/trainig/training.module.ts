import { Module } from '@nestjs/common';
import { TrainigService } from './training.service';
import { TrainigController } from './training.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Training, TrainingSchema } from './schema/training.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Training.name,
        schema: TrainingSchema,
      },
    ]),
  ],
  controllers: [TrainigController],
  providers: [TrainigService],
})
export class TrainigModule {}
