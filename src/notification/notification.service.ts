import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
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

  /* async createNotification(createNotificationDto: CreateNotificationDto) {
    const notification = new this.notificationModel(createNotificationDto);
    console.log(notification);
    return 'This action adds a new notification';
  } */

  async createNotification(createNotificationDto: CreateNotificationDto) {
    const notification = new this.notificationModel(createNotificationDto);
    console.log(notification);
    await notification.save();
  }

  async markAsRead(notificationId: string) {
    const notification = await this.notificationModel.findById(notificationId);
    if (notification) {
      notification.read = true;
      await notification.save();
    }
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
