import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop({ type: String })
  cognitoSub: string;

  @Prop()
  username: string;

  @Prop()
  avatar: string;
}

export const CatSchema = SchemaFactory.createForClass(User);
