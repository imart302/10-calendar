import { createTestStore } from '../../../fixtures/createTestStore';
import { createUser } from '../../../../src/api/auth';
import { vi } from 'vitest';
import { ICreateUser, IUserCreated } from '../../../../src/types';
import { startRegister } from '../../../../src/store';

vi.mock('../../../../src/api/auth');


describe('Test on startRegister Thunk', () => {
  let testStore = createTestStore();

  const user: ICreateUser = {
    email: 'fake@email.com',
    password: '123123',
    username: 'fake',
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

  it('Should set the auth.state to creating when thunk is pending', async () => {
    const initialState = testStore.getState();

    vi.mocked(createUser).mockImplementation(() => {
      return new Promise<IUserCreated>(() => {});
    });

    const prom = testStore.dispatch(startRegister(user));

    const afterState = testStore.getState();

    expect(initialState.auth.state).toEqual('no-auth');
    expect(afterState.auth.state).toEqual('creating');

    prom.abort();
  });

  it('Should return the user created and then the auth.state to created', async () => {
    const initialState = testStore.getState();

    const resp: IUserCreated = {
      ok: true,
      message: 'Ok',
      user: {
        _id: 'fakeid',
        name: 'fakeuser',
      }
    };

    vi.mocked(createUser).mockResolvedValue(resp);

    await testStore.dispatch(startRegister(user));

    const afterState = testStore.getState();

    expect(initialState.auth.state).toEqual('no-auth');
    expect(afterState.auth.state).toBe('created');

  });

  it('Should set an error message when the createUser is rejected', async () => {
    const initialState = testStore.getState();
    const rejectData = {
      name: 'Reason',
      message: 'Message',
      code: '400',
    }

    vi.mocked(createUser).mockImplementation(() => {
      return Promise.reject(rejectData);
    });

    await testStore.dispatch(startRegister(user));

    const afterState = testStore.getState();

    expect(initialState.auth.state).toEqual('no-auth');
    expect(afterState.auth.state).toEqual('no-auth');
    expect(afterState.auth.error).toEqual({
      where: 'register',
      message: rejectData.message,
      code: rejectData.code
    });

  });

});
