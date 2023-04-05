import { renderHook, act, configure, waitFor } from '@testing-library/react';
import { useUIStore } from '../../../src/hooks';
import { Provider } from 'react-redux';
import { createTestStore } from '../../fixtures/createTestStore';
import React from 'react';
import store from '../../../src/store/store';

import { vi } from 'vitest';

vi.mock('../../../src/store/store');

describe('Tests on useUIStore', async () => {
  let mockStore = createTestStore();

  beforeEach(() => {
    mockStore = createTestStore();

    //SUPER IMPORTANT FOR MAKE THE RENDER HOOK WORK PROPERLY
    vi.mocked(store.getState).mockReturnValue(mockStore.getState());
    vi.mocked(store.dispatch).mockImplementation(mockStore.dispatch);
  });

  it('Should return the default values', () => {
    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
    });
  });

  it('Should set the isDateModalOpen to true', () => {
    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const initial = result.current.isDateModalOpen;
    const { openDateModal } = result.current;

    act(() => {
      openDateModal();
    });

    expect(initial).toBe(false);
    expect(result.current.isDateModalOpen).toBe(true);
  });
});
