import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { Status } from 'src/common/enums/status.enum';
import { WebsocketGateway } from 'src/websockets/websocket.gateway';
import { InjectRepository } from '@nestjs/typeorm';
import { Friends } from './entity/friends.entity';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
/* import { NotificationService } from 'src/notification/notification.service'; */
/* import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto'; */
/* import { UpdateFriendDto } from './dto/update-friend.dto'; */

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friends) private friendsRepository: Repository<Friends>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private webSocketGateway: WebsocketGateway,
  ) {}

  async createFriend(createFriendDto: CreateFriendDto) {
    const newFriend = this.friendsRepository.create(createFriendDto);
    await this.friendsRepository.save(newFriend);
    const msj = 1;
    const recipientId = createFriendDto.recipientId.toString();
    this.webSocketGateway.server.emit(recipientId, {
      message: msj,
    });
    return newFriend;
  }

  async acceptFriendRequest(requestId: string, userId: string) {
    const request = await this.friendsRepository.findOne({
      where: { id: requestId },
    });
    if (!request) throw new Error('Propuesta no encontrada');

    request.status = Status.ACCEPTED;
    await this.friendsRepository.save(request);

    const recipient = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['friendList'],
    });
    if (!recipient) throw new Error('Usuario destinatario no encontrado.');

    const sender = await this.usersRepository.findOne({
      where: { id: request.sender.id },
      relations: ['friendList'],
    });
    if (!sender) throw new Error('Usuario remitente no encontrado');

    if (!recipient.friendList.includes(sender)) {
      recipient.friendList.push(sender);
      await this.usersRepository.save(recipient);
    }

    if (!sender.friendList.includes(recipient)) {
      sender.friendList.push(recipient);
      await this.usersRepository.save(sender);
    }
  }

  findAll() {
    return `This action returns all friends`;
  }

  findOne(id: string) {
    return this.friendsRepository.findOne({ where: { id } });
  }

  findFriendsByRecipientId(recipientId: string) {
    return this.friendsRepository.find({
      where: { recipient: { id: recipientId } },
    });
  }

  /* update(id: number, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  } */

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
