import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTrainingListDto } from './dto/create-training-list.dto';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';
import { UpdateTrainingListDto } from './dto/update-training-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingList } from './entity/training-list.entity';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainingListService {
  constructor(
    @InjectRepository(TrainingList)
    private trainingListRepository: Repository<TrainingList>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  /* async findAllTrainingList() {
    return this.trainingListModel.find();
  } */

  async findAllTrainingListByUserId(user: UserActiveInterface) {
    if (user.role === Role.ADMIN) {
      return await this.trainingListRepository.find({ relations: ['user'] });
    }
    return this.trainingListRepository.find({
      where: { userEmail: user.email },
      relations: ['user'],
    });
  }

  async findOneTrainingList(id: string, user: UserActiveInterface) {
    const list = await this.trainingListRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!list) throw new BadRequestException('Lista no encontrada');
    this.validateOwnership(list, user);
    return list;
  }

  async createTrainingList(createTrainingListDto: CreateTrainingListDto) {
    const findUser = await this.userRepository.findOne({
      where: { id: createTrainingListDto.userId },
    });
    if (!findUser) throw new NotFoundException('Usuario no encontrado');

    const newTrainingList = this.trainingListRepository.create({
      ...createTrainingListDto,
      user: findUser,
    });

    const trainingListSaved =
      await this.trainingListRepository.save(newTrainingList);

    findUser.trainingList = [
      ...(findUser.trainingList || []),
      trainingListSaved,
    ];
    await this.userRepository.save(findUser);

    return trainingListSaved;
  }

  async updateOneTrainingList(
    id: string,
    trainingList: UpdateTrainingListDto,
    user: UserActiveInterface,
  ) {
    const existingList = await this.findOneTrainingList(id, user);
    Object.assign(existingList, trainingList);
    return this.trainingListRepository.save(existingList);
  }

  async deleteOneTrainingList(id: string, user: UserActiveInterface) {
    await this.findOneTrainingList(id, user);
    await this.trainingListRepository.delete(id);
    return { message: 'Lista eliminada correctamente' };
  }

  private validateOwnership(date: any, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && date.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }
}
