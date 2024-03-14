import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { TrainingListService } from './training-list.service';
import { CreateTrainingListDto } from './dto/create-training-list.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { UpdateTrainingListDto } from './dto/update-training-list.dto';

@Auth(Role.USER)
@Controller('training-list')
export class TrainingListController {
  constructor(private readonly trainingListService: TrainingListService) {}

  @Get()
  async findAll(@ActiveUser() user: any) {
    return this.trainingListService.findAllTrainingListByUserId(user);
  }

  @Get(':id')
  async findTrainingListOne(
    @Param('id') id: string,
    @ActiveUser() user: UserActiveInterface,
  ) {
    if (!id) throw new NotFoundException('ID de la lista no proporcionada');
    const trainingList = await this.trainingListService.findOneTrainingList(
      id,
      user,
    );
    if (!trainingList) throw new NotFoundException('Lista no encontrada');
    return trainingList;
  }

  @Post()
  createTrainingList(
    @Body() createTrainingListDto: CreateTrainingListDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    createTrainingListDto.userEmail = user.email;
    return this.trainingListService.createTrainingList(createTrainingListDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTrainingListDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    const trainingList = await this.trainingListService.updateOneTrainingList(
      id,
      body,
      user,
    );
    if (!trainingList) throw new NotFoundException('Lista no encontrada');
    return trainingList;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOneList(
    @Param('id') id: string,
    @ActiveUser() user: UserActiveInterface,
  ) {
    const traininglist = await this.trainingListService.deleteOneTrainingList(
      id,
      user,
    );
    if (!traininglist)
      throw new NotFoundException('Lista de ejercicio no encontrada');
    return traininglist;
  }
}
