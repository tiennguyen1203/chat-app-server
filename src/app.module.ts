import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelsModule } from 'src/api/channels/channels.module';
import { MessagesController } from 'src/api/messages/messages.controller';
import { MessagesModule } from 'src/api/messages/messages.module';
import { RoomsModule } from 'src/api/rooms/rooms.module';
import { AppController } from 'src/app.controller';
import { AppGateway } from 'src/app.gateway';
import { AppService } from 'src/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { Channel, ChannelSchema } from 'src/schemas/channel.schema';
import { UsersModule } from 'src/api/users/users.module';

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
