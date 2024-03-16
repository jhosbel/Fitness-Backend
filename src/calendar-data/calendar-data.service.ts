import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CalendarData } from './schema/calendar-data.schema';
import { Model } from 'mongoose';
import { CreateCalendarDataDto } from './dto/create-calendar-data.dto';
import { Users } from '../users/schema/users.schema';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';
/* import { UpdateCalendarDataDto } from './dto/update-calendar-data.dto'; */

@Injectable()
export class CalendarDataService {
  constructor(
    @InjectModel(CalendarData.name)
    private calendarDataModel: Model<CalendarDataService>,
    @InjectModel(Users.name)
    private userModel: Model<Users>,
  ) {}

  /* async findAllCalendarData() {
    return this.calendarDataModel.find();
  } */

  async findAllCalendarDataById(user: UserActiveInterface) {
    if (user.role === Role.ADMIN) {
      return this.calendarDataModel.find();
    }
    const result = await this.calendarDataModel.find({ userEmail: user.email });
    return result;
  }

  async findOneCalendarData(id: string) {
    return await this.calendarDataModel.findById(id);
  }
  async createCalendarData(createCalendarDataDto: CreateCalendarDataDto) {
    const findUser = await this.userModel.findById(
      createCalendarDataDto.userId,
    );
    if (!findUser) throw new NotFoundException('Usuario no encontrado');
    const newCalendarData = new this.calendarDataModel(createCalendarDataDto);
    const calendarDataSaved = await newCalendarData.save();
    await findUser.updateOne({
      $push: {
        calendarData: calendarDataSaved._id,
      },
    });
    return calendarDataSaved;
  }

  /* update(id: number, updateCalendarDatumDto: UpdateCalendarDatumDto) {
    return `This action updates a #${id} calendarDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} calendarDatum`;
  } */

  private validateOwnership(date: any, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && date.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }
}
