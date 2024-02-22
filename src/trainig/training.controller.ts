import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { TrainigService } from './training.service';
import { CreateTrainigDto } from './dto/create-training.dto';

@Controller('training')
export class TrainigController {
  constructor(private readonly trainigService: TrainigService) {}

  @Get()
  findAllTraining() {
    return this.trainigService.findAllTrainings();
  }

  @Get(':id')
  async findOneTraining(@Param('id') id: string) {
    const training = await this.trainigService.findOneTraining(id);
    if (!training) throw new NotFoundException('Entrenamiento no encontrado');
    return training;
  }

  @Post()
  createTraining(@Body() body: CreateTrainigDto) {
    return this.trainigService.createTraining(body);
  }

  @Put(':id')
  async updateTraining(@Param('id') id: string, @Body() body: any) {
    const training = await this.trainigService.updateTraining(id, body);
    if (!training) throw new NotFoundException('Entrenamiento no encontrado');
    return training;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTraining(@Param('id') id: string) {
    const exercise = await this.trainigService.deleteOneTraining(id);
    if (!exercise) throw new NotFoundException('Entrenamiento no encontrado');
    return exercise;
  }
}
