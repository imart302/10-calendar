import {
  ActionReducerMapBuilder,
  createAsyncThunk
} from '@reduxjs/toolkit';
import {  renew } from '../../../api';
import { IAuthState,  IUserLogged } from '../../../types';
import { loginReducer } from '../reducers';

export const startRenewToken = createAsyncThunk<
  IUserLogged,
  void
>('renew/login', async (): Promise<IUserLogged> => {

  const loggedUser = await renew();
  return loggedUser;
  
});


export const buildStartRenewToken = (
  builder: ActionReducerMapBuilder<IAuthState>
) => {
  builder.addCase(startRenewToken.pending, (state) => {
    state.state = 'renew';
  });
  builder.addCase(startRenewToken.fulfilled, loginReducer);
  builder.addCase(startRenewToken.rejected, (state, action) => {
    state.state = 'no-auth';
    localStorage.removeItem('x-token');
    state.error = {
      where: 'renew',
      message: action.error.message ?? 'Unknown error',
      code: action.error.code ?? 'Unknown error',
    };
  });
};
