import { Module } from '@nestjs/common';
import { TrainigService } from './training.service';
import { TrainigController } from './training.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entity/training.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Training])],
  controllers: [TrainigController],
  providers: [TrainigService],
})
export class TrainigModule {}
