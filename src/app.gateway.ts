import { InjectModel } from '@nestjs/mongoose';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Server } from 'socket.io';
import { Channel, ChannelDocument } from 'src/schemas/channel.schema';
@WebSocketGateway(80)
export class AppGateway {
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<ChannelDocument>,
  ) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('connection')
  handleConnection(client: any, payload: any) {
    console.log(payload);
  }

  @SubscribeMessage('channel-join')
  async channelJoin(client: any, payload: any) {
    console.log('connection', payload);
    const result = await this.channelModel.findOneAndUpdate(
      { _id: payload },
      { $inc: { participants: 1 } },
      { new: true },
    );

    this.server.emit('channel', result);
  }

  @SubscribeMessage('send-message')
  sendMessage(client: any, payload: any) {
    console.log('send-message: ', payload);
    this.server.emit('message', payload);
  }
}
