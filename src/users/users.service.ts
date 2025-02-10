import { BadRequestException, Injectable } from '@nestjs/common';
//import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
//import { UserConfigService } from 'src/user-config/user-config.service';
import { Users } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/common/enums/rol.enum';
import { UserConfig } from 'src/user-config/entity/user-config.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(UserConfig)
    private userConfigRepository: Repository<UserConfig>,
  ) {}

  async sendNotification(userId: string, message: string) {
    // Aquí puedes implementar la lógica para enviar la notificación al usuario
    console.log(`Notificando al usuario ${userId}: ${message}`);
  }

  async create(userData: Partial<Users>): Promise<Users> {
    try {
      const user = this.userRepository.create(userData);
      const savedUser = await this.userRepository.save(user);

      const userConfig = this.userConfigRepository.create({ user: savedUser });
      await this.userConfigRepository.save(userConfig);

      savedUser.userConfig = userConfig;
      await this.userRepository.save(savedUser);
      return savedUser;
    } catch (error) {
      console.error('Error al crear usuario en UsersService:', error);
      throw new BadRequestException('No se pudo crear el usuario');
    }
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['trainingList', 'calendarData', 'userConfig', 'friendList'],
    });
  }

  //hacer esto con TypeORM
  /* findByEmailWithPassword(email: string) {
    return this.usersModel.findOne({
      where: { email },
      onselect: ['id', 'name', 'email', 'password', 'role'],
    });
  } */

  findAll() {
    return this.userRepository.find({
      relations: ['trainingList', 'calendarData', 'userConfig', 'friendList'],
    });
  }

  findCoachByRole(role: Role) {
    return this.userRepository.find({
      where: { role },
      relations: ['trainingList', 'calendarData', 'userConfig', 'friendList'],
    });
  }

  findUserByRole(role: Role) {
    return this.userRepository.find({
      where: { role },
      relations: ['trainingList', 'calendarData', 'userConfig', 'friendList'],
    });
  }

  findOneUser(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['trainingList', 'calendarData', 'userConfig', 'friendList'],
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUserPassword(userId: string, newPassword: string) {
    await this.userRepository.update(userId, { password: newPassword });
  }

  async removeUser(id: string) {
    await this.userRepository.delete(id);
  }
}
