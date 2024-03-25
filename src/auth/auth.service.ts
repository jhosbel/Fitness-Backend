import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, email, password }: RegisterDto) {
    try {
      await this.usersService.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      });
      return { name, email };
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

    const payload = {
      email: user.email,
      role: user.role,
      id: user._id.toString(),
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email,
      id: user._id.toString(),
      role: user.role,
    };
  }

  async profile({ email, role }: { email: string; role: string }) {
    /* if (role !== 'admin') {
      throw new UnauthorizedException('No estas autorizado');
    } */
    return await this.usersService.findOneByEmail(email);
  }
}
