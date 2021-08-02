import { Module } from '@nestjs/common';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { Channel, ChannelSchema } from 'src/schemas/channel.schema';
import { MongooseModule } from '@nestjs/mongoose';

console.log(Channel.name);
@Module({
  controllers: [ChannelsController],
  providers: [ChannelsService],
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
  ],
})
export class ChannelsModule {}
