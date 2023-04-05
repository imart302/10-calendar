import { ILoginUser, ICreateUser } from '@/types';
import { calendarApi } from './calendarApi';
import { IUserCreated, IUserLogged } from '@/types/apiResponses';

export const login = async (user: ILoginUser): Promise<IUserLogged> => {
  const path = '/auth';

  const resp = await calendarApi.post(path, user);
  const loggedUser = resp.data as unknown as IUserLogged;

  return loggedUser;
};

export const renew = async (): Promise<IUserLogged> => {
  const path = '/auth/renew';
  const resp = await calendarApi.get(path);
  const loggedUser = resp.data as unknown as IUserLogged;

  return loggedUser;
};


export const createUser = async (user: ICreateUser): Promise<IUserCreated> => {
  const path = '/auth/new';

  const resp = await calendarApi.post(path, user);
  const newuser = resp.data as unknown as IUserCreated;

  return newuser;
};


