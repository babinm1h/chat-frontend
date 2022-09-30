import { IUser } from "./entities";

export type TRegisterArgs = Pick<IUser, "email" | "firstName" | "lastName"> & { password: string };

export type TLoginArgs = Pick<TRegisterArgs, "email" | "password">;
