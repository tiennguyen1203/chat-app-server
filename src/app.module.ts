import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesController } from './messages/messages.controller';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { AppGateway } from './app.gateway';
import { RoomsModule } from './rooms/rooms.module';
import { ChannelsModule } from './channels/channels.module';
import { Channel, ChannelSchema } from 'src/schemas/channel.schema';
import { ChannelsService } from './channels/channels.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/chat-app'),
    MessagesModule,
    UsersModule,
    RoomsModule,
    ChannelsModule,
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
    AuthModule,
  ],
  controllers: [AppController, MessagesController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
