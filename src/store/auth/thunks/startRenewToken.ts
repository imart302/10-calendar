import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  AsyncThunkPayloadCreatorReturnValue
} from '@reduxjs/toolkit';
import { renew } from '../../../api';
import { IAuthState, IUserLogged } from '../../../types';
import { loginReducer } from '../reducers';
import { ApiError } from '@/api/ApiErrors';

export const startRenewToken = createAsyncThunk<
  IUserLogged,
  void
>('renew/login', async (): Promise<IUserLogged> => {
  try {
    const loggedUser = await renew();
    return loggedUser;
  } catch (error) {


    throw (error as ApiError);
  }
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
    state.error = action.error;
  });

};
