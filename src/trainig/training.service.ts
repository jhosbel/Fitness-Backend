import { Injectable } from '@nestjs/common';
import { CreateTrainigDto } from './dto/create-training.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Training } from './schema/training.schema';
import { Model } from 'mongoose';

@Injectable()
export class TrainigService {
  constructor(
    @InjectModel(Training.name) private trainingModel: Model<Training>,
  ) {}

  findAllTrainings() {
    return this.trainingModel.find();
  }

  async createTraining(createTraining: CreateTrainigDto) {
    const newTraining = new this.trainingModel(createTraining);
    return newTraining.save();
  }
}
