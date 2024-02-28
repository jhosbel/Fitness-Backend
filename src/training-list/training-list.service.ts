import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TrainingList } from './schema/training-list.schema';
import { Model } from 'mongoose';
import { CreateTrainingListDto } from './dto/create-training-list.dto';
/* import { UpdateTrainingListDto } from './dto/update-training-list.dto'; */

@Injectable()
export class TrainingListService {
  constructor(
    @InjectModel(TrainingList.name)
    private trainingListModel: Model<TrainingList>,
  ) {}

  findAllTrainingList() {
    return this.trainingListModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} trainingList`;
  }

  async createTrainingList(createTrainingListDto: CreateTrainingListDto) {
    const newTrainingList = new this.trainingListModel(createTrainingListDto);
    return newTrainingList.save();
  }

  /* update(id: number, updateTrainingListDto: UpdateTrainingListDto) {
    return `This action updates a #${id} trainingList`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainingList`;
  } */
}
