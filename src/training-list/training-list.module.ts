import { Module } from '@nestjs/common';
import { TrainingListService } from './training-list.service';
import { TrainingListController } from './training-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TrainingList,
  TrainingListSchema,
} from './schema/training-list.schema';
import { Users, UsersSchema } from '../users/schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TrainingList.name,
        schema: TrainingListSchema,
      },
      {
        name: Users.name,
        schema: UsersSchema,
      },
    ]),
  ],
  controllers: [TrainingListController],
  providers: [TrainingListService],
})
export class TrainingListModule {}
