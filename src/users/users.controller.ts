import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth(Role.USER)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /* @Auth(Role.USER)
  @Get('typecoach/:role')
  findCoachByRole(@Param('role') role: string) {
    if (role === Role.USER) throw new NotFoundException('No estas autorizado');
    if (role === Role.ADMIN) throw new NotFoundException('No estas autorizado');
    return this.usersService.findCoachByRole(role);
  }

  @Auth(Role.COACH)
  @Get('typeuser/:role')
  findUserByRole(@Param('role') role: string) {
    if (role === Role.ADMIN) throw new NotFoundException('No estas autorizado');
    return this.usersService.findCoachByRole(role);
  } */

  @Auth(Role.USER)
  @Get('allforusers')
  findAllExceptAdmin() {
    return this.usersService.findAllUsersAndCoach();
  }

  @Auth(Role.COACH)
  @Get('allforcoach')
  findAllForCoach() {
    return this.usersService.findAllUsersAndCoach();
  }

  @Auth(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneUser(id);
  }

  @Auth(Role.USER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id') id: string,
    @ActiveUser() user: UserActiveInterface,
  ) {
    const userDeleted = await this.usersService.removeUser(id, user);
    if (!userDeleted) throw new NotFoundException('Usuario no encontrado');
    return userDeleted;
  }
}
