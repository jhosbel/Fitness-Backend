import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { WebsocketGateway } from 'src/websockets/websocket.gateway';
import { NotificationService } from 'src/notification/notification.service';
/* import { UpdateFriendDto } from './dto/update-friend.dto'; */

@Controller('friends')
export class FriendsController {
  constructor(
    private readonly friendsService: FriendsService,
    private readonly notificationService: NotificationService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  @Post()
  async create(@Body() createFriendDto: CreateFriendDto) {
    const friend = await this.friendsService.createFriend(createFriendDto);

    const message = 'Te ah enviado una solicitud de amistad';
    const recipientId = createFriendDto.recipientId.toString();
    await this.notificationService.createNotification(recipientId, message);
    /* const notificationData = { recipientId, message };
    this.websocketGateway.sendNotificationToUser(notificationData); */

    return friend;
  }

  @Get()
  findAll() {
    return this.friendsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendsService.findOne(id);
  }

  @Get('recipient/:recipientId')
  async findFrinedsByRecipientId(@Param('recipientId') recipientId: string) {
    return this.friendsService.findFriendsByRecipientId(recipientId);
  }

  @Post(':requestId/accept/:userId')
  async acceptFriendRequest(
    @Param('requestId') requestId: string,
    @Param('userId') userId: string,
  ) {
    await this.friendsService.acceptFriendRequest(requestId, userId);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
    return this.friendsService.update(+id, updateFriendDto);
  } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendsService.remove(+id);
  }
}
