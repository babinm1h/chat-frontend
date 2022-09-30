import { $authInstance, $instance } from ".";
import { TLoginArgs, TRegisterArgs } from "../types/args";
import { IUser } from "../types/entities";
import { setTokenCookie } from "../utils/cookie.helpers";

export interface IAuthResponse {
  user: IUser;
  token: string;
}

export class AuthService {
  static async register(args: TRegisterArgs): Promise<IAuthResponse> {
    const { data } = await $instance.post<IAuthResponse>("/auth/register", args);
    setTokenCookie(data.token);
    return data;
  }

  static async login(args: TLoginArgs): Promise<IAuthResponse> {
    const { data } = await $instance.post<IAuthResponse>("/auth/login", args);
    setTokenCookie(data.token);
    return data;
  }

  static async checkAuth(): Promise<IUser> {
    const { data } = await $authInstance.get<IUser>("/auth/check");
    return data;
  }
}
