import { useAuthStore } from '../../../src/hooks';
import { act, renderHook } from '@testing-library/react';
import { createTestStore } from '../../fixtures/createTestStore';
import { Provider } from 'react-redux';
import React from 'react';
//import { startRenewToken } from '../../../src/store/auth/thunks/startRenewToken';
import { vi } from 'vitest';
import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserLogged } from '../../../src/types';
import { renew } from '../../../src/api/auth';
import { ApiError } from '../../../src/api/ApiErrors';

const loggedUser: IUserLogged = {
  ok: true,
  token: 'newtoken',
  user: {
    _id: 'id',
    name: 'name',
  }
}

vi.mock('../../../src/api/auth', () => {
  return {
    renew: vi.fn(() => loggedUser),
  }
});

describe('Tests on useAuthStore hook', () => {
  let mockStore = createTestStore();

  beforeEach(() => {
    mockStore = createTestStore();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('Should set the default state', () => {
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children} </Provider>
      ),
    });

    expect(result.current).toEqual({
      auth: {
        error: null,
        state: 'no-auth',
        token: null,
        user: null,
      },
      checkAuthToken: expect.any(Function),
    });
  });

  it('Should call startRenewToken and set the correct auth when there is token in localStorage', async () => {
    localStorage.setItem('x-token', 'token');
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children} </Provider>
      ),
    });

    const { checkAuthToken } = result.current;
    await act(async () => {
      await checkAuthToken();
    });

    const expectedState = {
      user: loggedUser.user,
      state: 'auth',
      error: null,
      token: loggedUser.token
    }
    expect(result.current.auth).toEqual(expectedState);
  });

  it('Should preserve the state when error ocurs and set the error', async () => {
    localStorage.setItem('x-token', 'token');
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children} </Provider>
      ),
    });

    const error = new ApiError({Accept: 'Test', xToken: 'token'}, "500", 'mock message', '/', 'get', '/', 'none', 'none');

    vi.mocked(renew).mockImplementation(async () => {
      throw error;
    });

    const { checkAuthToken } = result.current;
    await act(async () => {
      await checkAuthToken();
    });

    const expetedError: SerializedError = { 
      message: error.message,
      name: error.name,
      stack: error.stack,
      code: error.code,
    }

    const expectedState = {
      user: null,
      state: 'no-auth',
      error: expetedError,
      token: null
    }
    
    expect(result.current.auth).toEqual(expectedState);
  });


});
