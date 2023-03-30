import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState, ILoginUser, IUser } from '../../../types';
import { IUserLogged } from '../../../types/apiResponses';

export const loginReducer: CaseReducer<IAuthState, PayloadAction<IUserLogged>> = (
  state,
  action
) => {
  state.user = action.payload.user; 
  state.state = 'auth';
  state.token = action.payload.token;
};

export const resetLoginReducer : CaseReducer<IAuthState> = (
  state
) => {
  state.error = null;
  state.user = null;
  state.state = 'no-auth';
};

