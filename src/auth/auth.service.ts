import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register({ name, email, password }: RegisterDto) {
    try {
      const newUser = await this.usersService.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      });
      return newUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('El correo ya existe');
      }
      throw error;
    }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Correo invalido');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña invalida');
    }
    return user;
  }
}
