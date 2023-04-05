import { CaseReducer, PayloadAction, combineReducers, createReducer } from '@reduxjs/toolkit';
import { AuthStatesEnum, IAuthState } from '../../../types';
import { IUserLogged } from '../../../types/apiResponses';


export const loginReducer: CaseReducer<IAuthState, PayloadAction<IUserLogged>> = (
  state,
  action
) => {
  state.user = action.payload.user; 
  state.state = AuthStatesEnum.Auth;
  state.token = action.payload.token;
  localStorage.setItem('x-token', action.payload.token);
  localStorage.setItem('x-token-setdate', new Date().toISOString());
};

export const resetLoginReducer : CaseReducer<IAuthState> = (
  state
) => {
  state.error = null;
  state.user = null;
  state.state = AuthStatesEnum.NoAuth;
  state.token = null;
  localStorage.removeItem('x-token');
  localStorage.removeItem('x-token-setdate');
};

export const resetErrorReducer : CaseReducer<IAuthState> = (
  state
) => {
  state.error = null;
};

export const setStateReducer : CaseReducer<IAuthState, PayloadAction<AuthStatesEnum>> = (
  state,
  action
) => {
  state.state = action.payload;
};

