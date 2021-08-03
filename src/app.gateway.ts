import { InjectModel } from '@nestjs/mongoose';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { Channel, ChannelDocument } from 'src/schemas/channel.schema';
import { SendMessagePayload } from './interfaces/socket';
@WebSocketGateway(80)
export class AppGateway {
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<ChannelDocument>,
  ) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('connection')
  handleConnection(client: Socket, payload: any) {
    console.log('connection: ', client.id, payload);
    client.on('disconnect', () => {
      this.server.emit('');
    });
  }

  @SubscribeMessage('disconnect')
  handleDisconnection(client: Socket, payload: any) {
    console.log('disconnect: ', client.id, payload);
  }

  @SubscribeMessage('channel-join')
  async channelJoin(client: Socket, channelId: any) {
    client.join(channelId);
    console.log('channel-join: ', client.id, channelId);
    const result = await this.channelModel.findOneAndUpdate(
      { _id: channelId },
      { $inc: { participants: 1 } },
      { new: true },
    );

    console.log('result.sockets: ', result.sockets, typeof result.sockets);
    if (!result.sockets?.includes(client.id)) {
      await this.channelModel.findOneAndUpdate(
        { _id: channelId },
        { $push: { sockets: client.id } },
      );
    }

    this.server.to(channelId).emit('channel-join', result);
  }

  @SubscribeMessage('send-message')
  sendMessage(client: Socket, payload: SendMessagePayload) {
    console.log('send-message: ', client.id, payload);

    this.server.to(payload.channelId).emit('message', payload);
  }
}
