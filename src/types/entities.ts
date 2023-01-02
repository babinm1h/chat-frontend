interface IBaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TGender = 'male' | 'female';

export interface IUser extends IBaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  country: string;
  gender: TGender;
}

export interface IDialog extends IBaseEntity {
  receiverId: number;
  receiver: IUser;
  creator: IUser;
  creatorId: string;
  messages: IMessage[];
  lastMessage: IMessage | null;
}

export interface IMessage extends IBaseEntity {
  text: string;
  readed: boolean;
  creatorId: number;
  creator: IUser;
  dialogId: number;
  updatedAt: Date;

  replyToMsgId?: number;
  replyToMsg?: IMessage;

  attachments: IAttachment[];
}

export interface IGroupDialog extends IBaseEntity {
  creator: IUser;
  creatorId: string;
  messages: IMessage[];
  lastMessage: IMessage | null;
  users: IUser[];
  avatar?: string;
  title: string;
}

export enum FileTypes {
  video = 'video',
  image = 'image',
  audio = 'audio',
  file = 'file',
}

export interface IAttachment {
  type: FileTypes;
  path: string;
  id: number;
}
