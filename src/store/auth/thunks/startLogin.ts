import {
  ActionReducerMapBuilder,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { login } from '../../../api';
import { IAuthState, ILoginUser, IUser } from '../../../types';
import { IUserLogged } from '../../../types/apiResponses';
import { loginReducer } from '../reducers';

export const startLogin = createAsyncThunk<
  IUserLogged,
  ILoginUser
>('auth/login', async (user: ILoginUser): Promise<IUserLogged> => {
  
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
    state.state = 'no-auth';
    state.error = {
      where: 'login',
      message: action.error.message ?? 'Unknown error',
      code: action.error.code ?? 'Unknown error',
    };
  });
};
