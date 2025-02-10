import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCalendarDataDto } from './dto/create-calendar-data.dto';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarData } from './entity/calendar-data.entity';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
/* import { UpdateCalendarDataDto } from './dto/update-calendar-data.dto'; */

@Injectable()
export class CalendarDataService {
  constructor(
    @InjectRepository(CalendarData)
    private calendarDataRepository: Repository<CalendarData>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  /* async findAllCalendarData() {
    return this.calendarDataRepository.find();
  } */

  async findAllCalendarDataById(user: UserActiveInterface) {
    if (user.role === Role.ADMIN) {
      return this.calendarDataRepository.find();
    }
    return this.calendarDataRepository.find({
      where: { user: { id: user.userId } },
      relations: ['user'],
    });
  }

  async findOneCalendarData(id: string) {
    const calendarData = await this.calendarDataRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!calendarData) {
      throw new NotFoundException('Calendar data not found');
    }
    return calendarData;
  }

  async createCalendarData(createCalendarDataDto: CreateCalendarDataDto) {
    // Buscar al usuario por su ID
    const findUser = await this.userRepository.findOne({
      where: { id: createCalendarDataDto.userId },
    });
    if (!findUser) throw new NotFoundException('Usuario no encontrado');

    // Crear un nuevo registro de CalendarData
    const newCalendarData = this.calendarDataRepository.create({
      ...createCalendarDataDto,
      user: findUser, // Asignar explícitamente el objeto user
    });

    // Guardar el nuevo registro
    const calendarDataSaved =
      await this.calendarDataRepository.save(newCalendarData);

    return calendarDataSaved;
  }

  /* update(id: number, updateCalendarDatumDto: UpdateCalendarDatumDto) {
    return `This action updates a #${id} calendarDatum`;
  } */

  async remove(id: string, user: UserActiveInterface) {
    const calendarData = await this.findOneCalendarData(id);
    this.validateOwnership(calendarData, user);
    await this.calendarDataRepository.remove(calendarData);
    return { message: 'Calendario eliminado correctamente' };
  }

  /* private validateOwnership(date: any, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && date.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  } */
  private validateOwnership(
    calendarData: CalendarData,
    user: UserActiveInterface,
  ) {
    if (user.role !== Role.ADMIN && calendarData.user.id !== user.userId) {
      throw new UnauthorizedException(
        'No tienes permiso para realizar esta acción',
      );
    }
  }
}
