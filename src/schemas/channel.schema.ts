import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

export type ChannelDocument = Channel & Document;

@Schema()
export class Channel {
  @Prop()
  name: string;

  @Prop()
  users: User[];

  @Prop()
  sockets: any[];

  @Prop()
  participants: number;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
