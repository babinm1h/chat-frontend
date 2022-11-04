import { IUser } from "../../types/entities";

export interface IAuthState {
  user: null | IUser;
  isProcessing: boolean;
  loginError: string;
  registerError: string | string[];
  isCheckingAuth: boolean;
  isAuth: boolean;
}

export enum AuthActions {
  register = "auth/register",
  login = "auth/login",
  checkAuth = "auth/checkAuth",
}
