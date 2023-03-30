import {
  ActionReducerMapBuilder,
  CaseReducer,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import { login } from '../../../api';
import { IAuthState, ILoginUser, IUser } from '../../../types';
import { IUserLogged } from '../../../types/apiResponses';
import { AppDispatch } from '../../store';
import { loginReducer } from '../reducers';

export const startLogin = createAsyncThunk<
  IUserLogged,
  ILoginUser,
  { dispatch: AppDispatch }
>('auth/login', async (user: ILoginUser): Promise<IUserLogged> => {
  //DO LOGIN

  const loggedUser = await login(user);
  return loggedUser;
  
});


export const buildStartLogin = (
  builder: ActionReducerMapBuilder<IAuthState>
) => {
  builder.addCase(startLogin.pending, (state) => {
    state.state = 'fetching';
  });
  builder.addCase(startLogin.fulfilled, loginReducer);
  builder.addCase(startLogin.rejected, (state, action) => {
    state.error = action.error.message ?? 'Unknwn error';
  });
};
