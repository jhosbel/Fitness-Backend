import { Injectable } from '@nestjs/common';
/* import { CreateNotificationDto } from './dto/create-notification.dto'; */
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './schema/notification.schema';
import { Model } from 'mongoose';
/* import { UpdateNotificationDto } from './dto/update-notification.dto'; */

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}

  async createNotification(userId: string, message: string) {
    const newNotification = new this.notificationModel({
      userId,
      message,
      read: false,
    });
    console.log(newNotification);
    await newNotification.save();
  }

  async markAsRead(notificationId: string) {
    await this.notificationModel.findByIdAndUpdate(notificationId, {
      read: true,
    });
  }

  async findNotificationsByUserId(userId: string): Promise<Notification[]> {
    return this.notificationModel.find({ userId });
  }

  async getUnreadNotification(userId: string) {
    return this.notificationModel.find({ userId, read: false });
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
