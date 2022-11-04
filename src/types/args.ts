import { IMessage, IUser } from "./entities";

export type TRegisterArgs = Pick<IUser, "email" | "firstName" | "lastName"> & { password: string };

export type TLoginArgs = Pick<TRegisterArgs, "email" | "password">;

export type TCreateMessageArgs = Pick<IMessage, "dialogId" | "text">;

export type TUpdateMessageArgs = Pick<IMessage, "id" | "text">;