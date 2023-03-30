import { createSlice } from '@reduxjs/toolkit'
import { IAuthState } from '../../types';
import { resetLoginReducer, loginReducer } from './reducers';
import { buildStartLogin } from './thunks';
import { buildStartRegister } from './thunks/startRegister';


const initialState : IAuthState = {
  user: null,
  state: 'no-auth',
  error: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: loginReducer,
    resetLogin: resetLoginReducer,
  },
  extraReducers(builder) {
    buildStartLogin(builder);
    buildStartRegister(builder);
  },
  
});


export const { login, resetLogin } = authSlice.actions
export const authReducer =  authSlice.reducer