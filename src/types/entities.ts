interface IBaseEntity {
  id: number;
  createdAt: Date;
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
  message: any;
}
