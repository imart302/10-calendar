import { createSlice } from '@reduxjs/toolkit'
import { IAuthState } from '../../types';
import { resetLoginReducer, loginReducer, resetErrorReducer } from './reducers';
import { buildStartLogin, buildStartRegister, buildStartRenewToken } from './thunks';


const initialState : IAuthState = {
  user: null,
  state: 'no-auth',
  error: null,
  token: null,
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: loginReducer,
    resetLogin: resetLoginReducer,
    resetError: resetErrorReducer,
  },
  extraReducers(builder) {
    buildStartLogin(builder);
    buildStartRegister(builder);
    buildStartRenewToken(builder);
  },
  
});


export const authInitial = authSlice.getInitialState();
export const { login, resetLogin, resetError } = authSlice.actions
export const authReducer =  authSlice.reducer