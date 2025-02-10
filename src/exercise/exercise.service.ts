import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from 'src/exercise/dto/create-exercise.dto';
import { UpdateExerciseDto } from 'src/exercise/dto/update-exercise.dto';
import { Exercise } from './entity/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  findAllExercise() {
    return this.exerciseRepository.find();
  }

  async createExercise(createExercise: CreateExerciseDto) {
    const newExercise = this.exerciseRepository.create(createExercise);
    return this.exerciseRepository.save(newExercise);
  }

  async findOneExercise(id: string) {
    return this.exerciseRepository.findOne({ where: { id } });
  }

  async findByMuscle(muscle: string): Promise<Exercise[]> {
    return await this.exerciseRepository.find({ where: { muscle } });
  }

  async updateExerciese(id: string, exercise: UpdateExerciseDto) {
    const existingExercise = await this.exerciseRepository.findOne({
      where: { id },
    });
    if (!existingExercise) {
      throw new Error('Ejercicio no encontrado');
    }

    Object.assign(existingExercise, exercise);
    return this.exerciseRepository.save(existingExercise);
  }

  async deleteOneExercise(id: string) {
    const exercise = await this.exerciseRepository.findOne({ where: { id } });
    if (!exercise) {
      throw new Error('Ejercicio no encontrado');
    }
    return this.exerciseRepository.remove(exercise);
  }
}
