import { Controller, Post, Body, Get } from '@nestjs/common';
import { TrainigService } from './training.service';
import { CreateTrainigDto } from './dto/create-training.dto';

@Controller('training')
export class TrainigController {
  constructor(private readonly trainigService: TrainigService) {}

  @Get()
  findAllTraining() {
    return this.trainigService.findAllTrainings();
  }

  @Post()
  createTraining(@Body() body: CreateTrainigDto) {
    return this.trainigService.createTraining(body);
  }
}
