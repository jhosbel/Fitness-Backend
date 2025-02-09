import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserConfigDto } from './dto/create-user-config.dto';
import { UpdateUserConfigDto } from './dto/update-user-config.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserConfig } from './entity/user-config.entity';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserConfigService {
  constructor(
    @InjectRepository(UserConfig)
    private userConfigRepository: Repository<UserConfig>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async createUserConfig(createUserConfigDto: CreateUserConfigDto) {
    const user = await this.userRepository.findOne({
      where: { id: createUserConfigDto.userId },
      relations: ['userConfig'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const newUserConfig = this.userConfigRepository.create();
    await this.userConfigRepository.save(newUserConfig);

    user.userConfig = newUserConfig;
    await this.userRepository.save(user);
    return newUserConfig;
  }

  async findAll() {
    return await this.userConfigRepository.find();
  }

  async findOneUserConfig(id: string) {
    const userConfig = await this.userConfigRepository.findOne({
      where: { id },
    });

    if (!userConfig)
      throw new NotFoundException('Configuración de usuario no encontrada');
    return userConfig;
  }

  async updateUserConfig(id: string, updateUserConfigDto: UpdateUserConfigDto) {
    const userConfig = await this.userConfigRepository.preload({
      id,
      ...updateUserConfigDto,
    });

    if (!userConfig)
      throw new NotFoundException('Configuración de usuario no encontrada');

    return await this.userConfigRepository.save(userConfig);
  }

  async remove(id: string) {
    const userConfig = await this.userConfigRepository.findOne({
      where: { id },
    });

    if (!userConfig)
      throw new NotFoundException('Configuración de usuario no encontrada');

    await this.userConfigRepository.remove(userConfig);
    return { message: 'Configuración eliminada exitosamente' };
  }
}
