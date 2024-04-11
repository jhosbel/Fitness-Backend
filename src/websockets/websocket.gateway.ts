import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    return client.id;
  }

  @SubscribeMessage('notification')
  sendNotificationToUser(@MessageBody() data: any) {
    this.server.emit('NewNotification', data);
  }

  handleDisconnect(client: Socket) {
    return client.id;
  }
}
