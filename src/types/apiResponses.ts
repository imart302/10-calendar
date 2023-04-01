import { ICalendarEvent, IUser } from "./storeTypes";

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

export interface ICalendarEventsPaginated {
  ok: boolean; 
  pagination: {
    page: number;
    offset: number;
    count: number;
    remaining: number;
    data: ICalendarEvent[];
  }
}

export interface ICalendarDeleteEvent {
  ok: boolean;
  deleted: number;
}

