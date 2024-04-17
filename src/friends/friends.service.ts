import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { Friends } from './schema/friends.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/users/schema/users.schema';
import { Status } from 'src/common/enums/status.enum';
import { WebsocketGateway } from 'src/websockets/websocket.gateway';
/* import { NotificationService } from 'src/notification/notification.service'; */
/* import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto'; */
/* import { UpdateFriendDto } from './dto/update-friend.dto'; */

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friends.name) private friendsModel: Model<Friends>,
    @InjectModel(Users.name) private userModel: Model<Users>,
    private webSocketGateway: WebsocketGateway,
  ) {}

  async createFriend(createFriendDto: CreateFriendDto) {
    const { senderId, recipientId } = createFriendDto;
    //das
    const sender = await this.userModel.findById(senderId);

    if (sender.friendList.includes(recipientId)) {
      throw new Error('El destinatario ya está en la lista de amigos');
    }

    const newFriend = new this.friendsModel(createFriendDto);
    await newFriend.save();
    const msj = 1;
    const recipientIdNoti = createFriendDto.recipientId.toString();
    this.webSocketGateway.server.emit(recipientIdNoti, {
      message: msj,
    });
    return newFriend;
  }

  async acceptFriendRequest(requestId: string, userId: string) {
    const request = await this.friendsModel.findById(requestId);
    if (!request) throw new Error('Propuesta no encontrada');

    request.status = Status.ACCEPTED;
    await request.save();

    const recipient = await this.userModel.findById(userId);
    if (!recipient) throw new Error('Usuario destinatario no encontrado.');

    const senderId = request.senderId.toString();

    if (!recipient.friendList.includes(senderId)) {
      recipient.friendList.push(senderId);
      await recipient.save();
    }

    const sender = await this.userModel.findById(senderId);
    if (!sender) throw new Error('Usuario remitente no encontrado');

    const idRecipient = recipient._id.toString();

    if (!sender.friendList.includes(idRecipient)) {
      sender.friendList.push(idRecipient);
      await sender.save();
    }
  }

  findAll() {
    return `This action returns all friends`;
  }

  findOne(id: string) {
    return this.friendsModel.findById(id);
  }

  findFriendsByRecipientId(recipientId: string) {
    return this.friendsModel.find({ recipientId });
  }

  /* update(id: number, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  } */

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
