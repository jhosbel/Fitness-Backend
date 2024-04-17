import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { UserConfigService } from 'src/user-config/user-config.service';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<Users>,
    private userConfigService: UserConfigService,
  ) {}

  async sendNotification(userId: string, message: string) {
    // Aquí puedes implementar la lógica para enviar la notificación al usuario
    console.log(`Notificando al usuario ${userId}: ${message}`);
  }

  async create(createUserDto: CreateUserDto) {
    const newUsers = new this.usersModel(createUserDto);
    const savedUser = await newUsers.save();
    await this.userConfigService.createUserConfig({
      userId: savedUser.id,
      age: '',
      height: '',
      weight: '',
    });
    return savedUser;
  }

  findOneByEmail(email: string) {
    return this.usersModel
      .findOne({ email })
      .populate(['trainingList', 'calendarData', 'userConfig', 'friends']);
  }

  //hacer esto con TypeORM
  /* findByEmailWithPassword(email: string) {
    return this.usersModel.findOne({
      where: { email },
      onselect: ['id', 'name', 'email', 'password', 'role'],
    });
  } */

  findAll() {
    return this.usersModel
      .find()
      .populate(['trainingList', 'calendarData', 'userConfig', 'friends']);
  }

  /* findCoachByRole(role: string) {
    return this.usersModel.find({ role });
  }

  findUserByRole(role: string) {
    return this.usersModel.find({ role });
  } */

  async findAllUsersAndCoach() {
    return this.usersModel.find({ role: { $ne: Role.ADMIN } });
  }

  findOneUser(id: string) {
    return this.usersModel
      .findById(id)
      .populate(['trainingList', 'calendarData', 'userConfig', 'friends']);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.usersModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async updateUserPassword(userId: string, newPassword: string) {
    const user = await this.usersModel.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    user.password = newPassword;
    await user.save();
  }

  async removeUser(id: string, user: UserActiveInterface) {
    await this.findOneByEmail(user.email);
    return this.usersModel.findByIdAndDelete(id);
  }
}
