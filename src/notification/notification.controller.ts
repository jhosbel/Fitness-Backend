import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
/* import { UpdateNotificationDto } from './dto/update-notification.dto'; */

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    const userId = createNotificationDto.userId;
    const message = createNotificationDto.message;
    return this.notificationService.createNotification(userId, message);
  }

  @Post(':id/markAsRead')
  async markReadTrue(@Param('id') id: string) {
    await this.notificationService.markAsRead(id);
    return { message: 'Notification marked as read successfully' };
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  /* cambios */

  /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  } */

  @Get(':id')
  findOneNotification(@Param('id') id: string) {
    return this.notificationService.findNotificationsByUserId(id);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(+id, updateNotificationDto);
  } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
