import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { createUser } from '../../../api';
import {
  IAuthState,
  ICreateUser,
  IUserCreated,
} from '../../../types';
import { AppDispatch } from '../../store';


export const startRegister = createAsyncThunk<
  IUserCreated,
  ICreateUser,
  { dispatch: AppDispatch }
>('auth/create', async (user: ICreateUser) => {
  const resp = await createUser(user);
  return resp;
});

export const buildStartRegister = (
  builder: ActionReducerMapBuilder<IAuthState>
) => {
  builder.addCase(startRegister.pending, (state) => {
    state.state = 'creating';
  });
  builder.addCase(startRegister.fulfilled, (state) => {
    state.state = 'no-auth';
  });
  builder.addCase(startRegister.rejected, (state, action) => {
    state.error = action.error.message ?? 'Unknown error';
  });
};
