import { authSlice, login, resetError, resetLogin } from '../../../src/store';
import { IUserLogged } from '../../../src/types';
import { authState, errorState, initialState } from '../../fixtures/auth';


describe('Test on authSlice reducers', () => {

  const userLogged: IUserLogged = {
    ok: true,
    token: 'faketoken',
    user: {
      _id: 'fakeid',
      name: 'fakename'
    }
  };

  it('Should set the state.state to auth and set the auth.user', () => {
    const state = authSlice.reducer(initialState, login(userLogged));

    expect(state.state).toEqual('auth');
    expect(state.user).toEqual(userLogged.user);

  });

  it('Should set the auth to initial conditions', () => {

    const state = authSlice.reducer(authState, resetLogin());

    expect(state).toEqual(initialState);

  });

  it('Should reset the error in auth.error', () => {

    const state = authSlice.reducer(errorState, resetError());

    
    expect(state.error).toBe(null);
  });

});