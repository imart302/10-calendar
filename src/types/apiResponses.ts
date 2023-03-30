import { IUser } from "./storeTypes";

export interface IUserCreated {
  ok: boolean;
  message: string;
  user: IUser;
}

export interface IUserLogged {
  ok: boolean,
  token: string,
  user: IUser,
}

export interface IRenewToken {
  ok: boolean,
  toke: string,
  user: IUser,
}



