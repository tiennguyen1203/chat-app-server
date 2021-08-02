import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Date, ObjectId } from 'mongoose';
import { User } from './user.schema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  sender: User;

  @Prop()
  channelId: ObjectId;

  @Prop({ type: String })
  messageBody: string;

  @Prop({ default: Date.now(), type: Date })
  createdAt: Date;
}

export const CatSchema = SchemaFactory.createForClass(Message);
