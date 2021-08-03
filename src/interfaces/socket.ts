import { ObjectId } from 'mongoose';
export type SendMessagePayload = {
  channelId: string;
  text: string;
  senderName: string;
  id: number;
};
