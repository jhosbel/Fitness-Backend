import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import { Model } from 'mongoose';
/* import { UpdateUserDto } from './dto/update-user.dto'; */

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  create(createUserDto: CreateUserDto) {
    const newUsers = new this.usersModel(createUserDto);
    return newUsers.save();
  }

  findOneByEmail(email: string) {
    return this.usersModel.findOne({ email }).populate(['trainingList']);
  }

  //hacer esto con TypeORM
  /* findByEmailWithPassword(email: string) {
    return this.usersModel.findOne({
      where: { email },
      onselect: ['id', 'name', 'email', 'password', 'role'],
    });
  } */

  findAll() {
    return this.usersModel.find().populate(['trainingList']);
  }

  /* findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  } */
}
