import { IMessage, IUser } from './entities';

export type TRegisterArgs = Pick<IUser, 'email' | 'firstName' | 'lastName' | 'country' | 'gender'> & {
  password: string;
};

export type TLoginArgs = Pick<TRegisterArgs, 'email' | 'password'>;

export type TUpdateMessageArgs = Pick<IMessage, 'id' | 'text'>;

export type TCreateGroupDialogArgs = { users: number[]; title: string };
