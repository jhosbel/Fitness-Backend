import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TrainingList } from './schema/training-list.schema';
import { Model } from 'mongoose';
import { CreateTrainingListDto } from './dto/create-training-list.dto';
import { Users } from '../users/schema/users.schema';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';
import { UpdateTrainingListDto } from './dto/update-training-list.dto';

@Injectable()
export class TrainingListService {
  constructor(
    @InjectModel(TrainingList.name)
    private trainingListModel: Model<TrainingList>,
    @InjectModel(Users.name)
    private userModel: Model<Users>,
  ) {}

  async findAllTrainingListByUserId(user: UserActiveInterface) {
    if (user.role === Role.ADMIN) {
      return await this.trainingListModel.find();
    }
    return this.trainingListModel.find({ userEmail: user.email });
  }

  async findOneTrainingList(id: string, user: UserActiveInterface) {
    const list = await this.trainingListModel.findById(id);
    if (!list) throw new BadRequestException('Lista no encontrada');
    this.validateOwnership(list, user);
    return list;
  }

  async createTrainingList(createTrainingListDto: CreateTrainingListDto) {
    const findUser = await this.userModel.findById(
      createTrainingListDto.userId,
    );
    if (!findUser) throw new NotFoundException('Usuario no encontrado');
    const newTrainingList = new this.trainingListModel(createTrainingListDto);
    const trainingListSaved = await newTrainingList.save();
    await findUser.updateOne({
      $push: {
        trainingList: trainingListSaved._id,
      },
    });
    return trainingListSaved;
  }

  async updateOneTrainingList(
    id: string,
    trainingList: UpdateTrainingListDto,
    user: UserActiveInterface,
  ) {
    await this.findOneTrainingList(id, user);
    return this.trainingListModel.findByIdAndUpdate(id, trainingList, {
      new: true,
    });
  }

  async deleteOneTrainingList(id: string, user: UserActiveInterface) {
    await this.findOneTrainingList(id, user);
    return this.trainingListModel.findByIdAndDelete(id);
  }

  private validateOwnership(date: any, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && date.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }
}
