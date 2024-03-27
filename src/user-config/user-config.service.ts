import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserConfigDto } from './dto/create-user-config.dto';
import { UpdateUserConfigDto } from './dto/update-user-config.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserConfig } from './schema/user-config.schema';
import { Model } from 'mongoose';
import { Users } from 'src/users/schema/users.schema';

@Injectable()
export class UserConfigService {
  constructor(
    @InjectModel(UserConfig.name) private userConfigModel: Model<UserConfig>,
    @InjectModel(Users.name) private userModel: Model<Users>,
  ) {}

  async createUserConfig(createUserConfigDto: CreateUserConfigDto) {
    const findUser = await this.userModel.findById(createUserConfigDto.userId);
    if (!findUser) throw new NotFoundException('Usuario no encontrado');
    const newUserConfig = new this.userConfigModel(createUserConfigDto);
    const savedUserConfig = await newUserConfig.save();
    await findUser.updateOne({
      $push: {
        userConfig: savedUserConfig._id,
      },
    });
    return savedUserConfig;
  }

  findAll() {
    return `This action returns all userConfig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userConfig`;
  }

  updateUserConfig(id: string, updateUserConfigDto: UpdateUserConfigDto) {
    return this.userConfigModel.findByIdAndUpdate(id, updateUserConfigDto, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} userConfig`;
  }
}
