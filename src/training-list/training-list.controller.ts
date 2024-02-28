import { Controller, Get, Post, Body } from '@nestjs/common';
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

  /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingListService.findOne(+id);
  } */

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
