import { Injectable } from '@nestjs/common';
import { CreateTrainigDto } from './dto/create-training.dto';
import { UpdateTrainigDto } from './dto/update-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from './entity/training.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainigService {
  constructor(
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>,
  ) {}

  findAllTrainings() {
    return this.trainingRepository.find();
  }

  async createTraining(createTraining: CreateTrainigDto) {
    const newTraining = this.trainingRepository.create(createTraining);
    return this.trainingRepository.save(newTraining);
  }

  async findOneTraining(id: string) {
    return await this.trainingRepository.findOne({ where: { id } });
  }

  async updateTraining(id: string, training: UpdateTrainigDto) {
    const existingTraining = await this.trainingRepository.findOne({
      where: { id },
    });
    if (!existingTraining) {
      throw new Error('Entrenamiento no encontrado');
    }
    Object.assign(existingTraining, training);

    return this.trainingRepository.save(existingTraining);
  }

  async deleteOneTraining(id: string) {
    const training = await this.trainingRepository.findOne({ where: { id } });
    if (!training) {
      throw new Error('Entrenamiento no encontrado');
    }
    return this.trainingRepository.remove(training);
  }
}
