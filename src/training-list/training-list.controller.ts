import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { TrainingListService } from './training-list.service';
import { CreateTrainingListDto } from './dto/create-training-list.dto';
/* import { UpdateTrainingListDto } from './dto/update-training-list.dto'; */

@Controller('training-list')
export class TrainingListController {
  constructor(private readonly trainingListService: TrainingListService) {}

  @Get()
  findAll() {
    return this.trainingListService.findAllTrainingList();
  }

  @Get(':id')
  async findTrainingListOne(@Param('id') id: string) {
    if (!id) throw new NotFoundException('ID de la lista no proporcionada');
    const trainingList = await this.trainingListService.findOneTrainingList(id);
    if (!trainingList) throw new NotFoundException('Lista no encontrada');
    return trainingList;
  }

  @Post()
  createTrainingList(@Body() createTrainingListDto: CreateTrainingListDto) {
    return this.trainingListService.createTrainingList(createTrainingListDto);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainingListDto: UpdateTrainingListDto) {
    return this.trainingListService.update(+id, updateTrainingListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingListService.remove(+id);
  } */
}
