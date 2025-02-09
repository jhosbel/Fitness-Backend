import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
} from '@nestjs/common';
import { UserConfigService } from './user-config.service';
import { CreateUserConfigDto } from './dto/create-user-config.dto';
import { UpdateUserConfigDto } from './dto/update-user-config.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
/* import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface'; */

@Controller('user-config')
export class UserConfigController {
  constructor(private readonly userConfigService: UserConfigService) {}

  @Auth(Role.USER)
  @Post()
  async create(@Body() createUserConfigDto: CreateUserConfigDto) {
    try {
      return await this.userConfigService.createUserConfig(createUserConfigDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'Error creando la configuracion de el usuario',
        );
      }
    }
  }

  @Get()
  findAll() {
    return this.userConfigService.findAll();
  }

  @Auth(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userConfigService.findOneUserConfig(id);
  }

  @Auth(Role.USER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserConfigDto: UpdateUserConfigDto,
  ) {
    return this.userConfigService.updateUserConfig(id, updateUserConfigDto);
  }

  @Auth(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userConfigService.remove(id);
  }
}
