import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ConflictException,
  NotFoundException,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from 'src/exercise/dto/create-exercise.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';

@ApiTags('Peticiones para Ejercicios')
@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Auth(Role.USER)
  @Get()
  findAllExercises() {
    return this.exerciseService.findAllExercise();
  }

  @Auth(Role.USER)
  @Get(':id')
  async findOneExercises(@Param('id') id: string) {
    if (!id) throw new NotFoundException('ID del ejercicio no proporcionada');
    const exercise = await this.exerciseService.findOneExercise(id);
    if (!exercise) throw new NotFoundException('Ejercicio no encontrado');
    return exercise;
  }

  @Auth(Role.USER)
  @Get('by-muscle/:muscle')
  async findByMuscle(@Param('muscle') muscle: string) {
    if (!muscle) throw new NotFoundException('Tipo de musculo no encontrado');
    const muscles = await this.exerciseService.findByMuscle(muscle);
    if (!muscles.length) throw new NotFoundException('Musculo no encontrado');
    return muscles;
  }

  @Auth(Role.ADMIN)
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

  @Auth(Role.ADMIN)
  @Patch(':id')
  async updateExercise(@Param('id') id: string, @Body() body: any) {
    const exercise = await this.exerciseService.updateExerciese(id, body);
    if (!exercise) throw new NotFoundException('Ejercicio no encontrado');
    return exercise;
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  @HttpCode(204)
  async deleteExercise(@Param('id') id: string) {
    const exercise = await this.exerciseService.deleteOneExercise(id);
    if (!exercise) throw new NotFoundException('Ejercicio no encontrado');
    return exercise;
  }
}
