import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from 'src/exercise/dto/create-exercise.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Peticiones para Ejercicios')
@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Get()
  findAllExercises() {
    return this.exerciseService.findAllExercise();
  }

  @Get(':id')
  async findOneExercises(@Param('id') id: string) {
    const exercise = await this.exerciseService.findOneExercise(id);
    if (!exercise) throw new NotFoundException('Ejercicio no encontrado');
    return exercise;
  }

  @Post()
  async createExercise(@Body() body: CreateExerciseDto) {
    try {
      return await this.exerciseService.createExercise(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('El ejercicio ya existe');
      }
      throw error;
    }
  }

  @Put(':id')
  async updateExercise(@Param('id') id: string, @Body() body: any) {
    const exercise = await this.exerciseService.updateExerciese(id, body);
    if (!exercise) throw new NotFoundException('Ejercicio no encontrado');
    return exercise;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteExercise(@Param('id') id: string) {
    const exercise = await this.exerciseService.deleteOneExercise(id);
    if (!exercise) throw new NotFoundException('Ejercicio no encontrado');
    return exercise;
  }
}
