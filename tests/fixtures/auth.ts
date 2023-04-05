import { IAuthState } from "../../src/types";

export const initialState : IAuthState = {
  user: null,
  state: 'no-auth',
  error: null,
  token: null,
}

export const authState : IAuthState = {
  error: {
    code: '400',
    message: 'message',
    where: 'login',
  },
  state: 'auth',
  token: 'faketoken',
  user: {
    _id: 'fakeid',
    name: 'fakename'
  }
}

export const errorState : IAuthState = {
  error: {
    code: '400',
    message: 'message',
    where: 'login',
  },
  state: 'no-auth',
  token: null,
  user: null,
}