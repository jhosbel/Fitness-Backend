import { Module } from '@nestjs/common';
import { TrainingListService } from './training-list.service';
import { TrainingListController } from './training-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingList } from './entity/training-list.entity';
import { Users } from 'src/users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingList, Users])],
  controllers: [TrainingListController],
  providers: [TrainingListService],
})
export class TrainingListModule {}
