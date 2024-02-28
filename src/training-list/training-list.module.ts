import { Module } from '@nestjs/common';
import { TrainingListService } from './training-list.service';
import { TrainingListController } from './training-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TrainingList,
  TrainingListSchema,
} from './schema/training-list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TrainingList.name,
        schema: TrainingListSchema,
      },
    ]),
  ],
  controllers: [TrainingListController],
  providers: [TrainingListService],
})
export class TrainingListModule {}
