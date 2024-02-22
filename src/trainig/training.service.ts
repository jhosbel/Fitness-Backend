import { Injectable } from '@nestjs/common';
import { CreateTrainigDto } from './dto/create-training.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Training } from './schema/training.schema';
import { Model } from 'mongoose';
import { UpdateTrainigDto } from './dto/update-training.dto';

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

  async findOneTraining(id: string) {
    return await this.trainingModel.findById(id);
  }

  async updateTraining(id: string, training: UpdateTrainigDto) {
    return this.trainingModel.findByIdAndUpdate(id, training, { new: true });
  }

  async deleteOneTraining(id: string) {
    return this.trainingModel.findByIdAndDelete(id);
  }
}
