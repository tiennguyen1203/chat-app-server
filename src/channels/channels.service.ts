import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Channel, ChannelDocument } from 'src/schemas/channel.schema';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<ChannelDocument>,
    @InjectConnection() private connection: Connection,
  ) {}
  async getMany() {
    console.log(Channel.name);
    const channels = await this.channelModel.find({}).exec();

    const abc = await this.connection.db.listCollections().toArray();
    console.log('abc: ', abc);
    console.log(channels);
    return {
      channels,
    };
  }
}
