export interface IUIState {
  isModalOpen: boolean;
}

export interface ICalendarEventNew {
  title: string;
  notes: string;
  start: string;
  end: string;
  bgColor: string;
  user: {
    _id: string;
    name: string;
  };
}

export interface IEventCreatePayload {
  title: string;
  notes: string;
  start: string;
  end: string;
  bgColor: string;
}

export interface ICalendarEventNewNotSerializable {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: {
    _id: string;
    name: string;
  };
}

export interface ICalendarEvent extends ICalendarEventNew {
  _id: string;
}

export interface ICalendarEventNotSerializable
  extends ICalendarEventNewNotSerializable {
  _id: string;
}

export interface ICalendarState {
  activeEvent: null | ICalendarEvent;
  events: ICalendarEvent[];
  status: 'creating' | 'idle' | 'fetching';
  error: null | string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  name: string;
}

export enum AuthStatesEnum {
  Auth = 'auth',
  NoAuth = 'no-auth',
  Creating = 'creating',
  Created = 'created',
  Renew = 'renew',
}
export interface IAuthState {
  user: IUser | null;
  state: 'auth' | 'no-auth' | 'fetching' | 'creating' | 'created' | 'renew';
  token: string | null;
  error: null | {
    where: 'login' | 'register' | 'renew';
    message: string;
    code: string;
  }; 
}

export interface ICreateUser {
  email: string,
  password: string,
  username: string,
}

export interface IRootState {
  ui: IUIState,
  calendar: ICalendarState,
  auth: IAuthState
}