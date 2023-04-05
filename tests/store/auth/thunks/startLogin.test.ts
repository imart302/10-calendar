import { createTestStore } from '../../../fixtures/createTestStore';
import { login } from '../../../../src/api/auth';
import { vi } from 'vitest';
import { ILoginUser, IUserLogged } from '../../../../src/types';
import { startLogin, store } from '../../../../src/store';

vi.mock('../../../../src/api/auth');


describe('Test on startLogin Thunk', () => {
  let testStore = createTestStore();

  const user: ILoginUser = {
    email: 'fake@email.com',
    password: '123123',
  };

  const storage = new Map<string, string>();

  beforeAll(() => {
    global.Storage.prototype.setItem = vi.fn((key, value) => {
      storage.set(key, value);
    });
    global.Storage.prototype.getItem = vi.fn((key) => {
      return storage.get(key) ?? null;
    });
  });

  beforeEach(() => {
    testStore = createTestStore();
  });

  it('Should set the auth.state to fetching when thunk is pending', async () => {
    const initialState = testStore.getState();

    vi.mocked(login).mockImplementation(() => {
      return new Promise<IUserLogged>(() => {});
    });

    const prom = testStore.dispatch(startLogin(user));

    const afterState = testStore.getState();

    expect(initialState.auth.state).toEqual('no-auth');
    expect(afterState.auth.state).toEqual('fetching');

    prom.abort();
  });

  //this should be should call th respective reducer!!!!;
  it('Should set the user in auth.user, set auth.status to auth and save the token in localStorage unde x-token', async () => {
    const initialState = testStore.getState();

    const resp = {
      ok: true,
      token: 'token',
      user: {
        _id: 'fakeid',
        name: 'fakeuser',
      }
    };

    vi.mocked(login).mockResolvedValue(resp);

    await testStore.dispatch(startLogin(user));

    const afterState = testStore.getState();

    expect(initialState.auth.state).toEqual('no-auth');
    expect(localStorage.getItem('x-token')).toBe(resp.token);
    expect(afterState.auth.state).toBe('auth');
    expect(afterState.auth.user).toEqual(resp.user);

  });

  it('Should set an error message when the login is rejected', async () => {
    const initialState = testStore.getState();
    const rejectData = {
      name: 'Reason',
      message: 'Message',
      code: '400',
    }

    vi.mocked(login).mockImplementation(() => {
      return Promise.reject(rejectData);
    });

    await testStore.dispatch(startLogin(user));

    const afterState = testStore.getState();

    expect(initialState.auth.state).toEqual('no-auth');
    expect(afterState.auth.state).toEqual('no-auth');
    expect(afterState.auth.error).toEqual({
      where: 'login',
      message: rejectData.message,
      code: rejectData.code
    });

  });

});
