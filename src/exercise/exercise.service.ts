import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExerciseDto } from 'src/exercise/dto/create-exercise.dto';
import { UpdateExerciseDto } from 'src/exercise/dto/update-exercise.dto';
import { Exercise } from 'src/exercise/schema/exercise.schema';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
  ) {}

  findAllExercise() {
    return this.exerciseModel.find();
  }

  async createExercise(createExercise: CreateExerciseDto) {
    const newExercise = new this.exerciseModel(createExercise);
    return newExercise.save();
  }

  async findOneExercise(id: string) {
    return this.exerciseModel.findById(id);
  }

  async updateExerciese(id: string, exercise: UpdateExerciseDto) {
    return this.exerciseModel.findByIdAndUpdate(id, exercise, { new: true });
  }

  async deleteOneExercise(id: string) {
    return this.exerciseModel.findByIdAndDelete(id);
  }
}
