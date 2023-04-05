import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { useUIStore } from '../../../src/hooks';
import { createTestStore } from '../../fixtures/createTestStore';


describe('Tests on useUIStore', async () => {
  let mockStore = createTestStore();

  beforeEach(() => {
    mockStore = createTestStore();
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
