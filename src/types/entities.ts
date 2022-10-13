interface IBaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IBaseEntity {
  firstName: string;
  lastName: string;
  email: string;
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
  creatorId: number;
  creator: IUser;
  dialogId: number;
  updatedAt: Date;
}
