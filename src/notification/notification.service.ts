import { Injectable } from '@nestjs/common';
/* import { CreateNotificationDto } from './dto/create-notification.dto'; */
import { InjectRepository } from '@nestjs/typeorm';
//import { Notification } from './schema/notification.schema';
import { Notification } from './entity/notification.entity';
import { Repository } from 'typeorm';
/* import { UpdateNotificationDto } from './dto/update-notification.dto'; */

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async createNotification(userId: string, message: string) {
    const newNotification = this.notificationRepository.create({
      userId,
      message,
      read: false,
    });
    console.log(newNotification);
    return await this.notificationRepository.save(newNotification);
  }

  async markAsRead(notificationId: string) {
    await this.notificationRepository.update(notificationId, {
      read: true,
    });
  }

  async findNotificationsByUserId(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({ where: { userId } });
  }

  async getUnreadNotification(userId: string) {
    return this.notificationRepository.find({ where: { userId, read: false } });
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  /* update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  } */

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
